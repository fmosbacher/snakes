import Game from './game'
import Snake from './snake'
import Food from './food'
import { randomGaussian } from './utils'

export default class Evolution {

    game: Game
    selectionPool: Snake[]
    mutationRate: number

    constructor(game: Game, mutationRate: number = 0.05) {
        this.game = game
        this.mutationRate = mutationRate
    }

    updateGeneration(): void {
        const populationSize = this.game.pairs.length

        this.updateSelectionPool()
        this.game.clearPopulation()

        for (let i = 0; i < populationSize; i++) {
            const parents = this.select()
            const [a, b] = parents
            const offspring = this.crossover(a, b)
            this.mutate(offspring)
            this.game.addPair(
                offspring,
                new Food(this.game.getRandomPosition())
            )
        }

        this.game.isOver = false
    }

    updateSelectionPool(): void {
        const maxScores = this.game.pairs
            .map(pair => pair.snake.score)
            .reduce((a, b) => a + b)

        if (maxScores === 0) {
            this.selectionPool = this.game.pairs
                .map(pair => {
                    const initialPos = this.game.getRandomPosition()
                    return new Snake(initialPos, pair.snake.maxMoves)
                })

            return
        }

        this.selectionPool = []

        const snakes = this.game.pairs.map(pair => pair.snake)

        for (let snake of snakes) {
            const participation = Math.floor(snake.score / maxScores * 1000)

            for (let i = 0; i < participation; i++) {
                const initialPos = this.game.getRandomPosition()
                const snakeReset = new Snake(initialPos, snake.maxMoves)

                snakeReset.brain = snake.brain

                this.selectionPool.push(snakeReset)
            }
        }
    }

    select(): Snake[] {
        const aIndex = Math.floor(Math.random() * this.selectionPool.length)
        const bIndex = Math.floor(Math.random() * this.selectionPool.length)

        return [
            this.selectionPool[aIndex],
            this.selectionPool[bIndex]
        ]
    }

    crossover(a: Snake, b: Snake): Snake {
        const initialPos = this.game.getRandomPosition()
        const offspring = new Snake(initialPos, a.maxMoves)

        for (let i = 0; i < offspring.brain.length; i++) {
            const layer = offspring.brain[i]

            for (let row = 0; row < layer.weights.length; row++) {
                for (let col = 0; col < layer.weights[row].length; col++) {
                    const chosenSnake = Math.random() < 0.5 ? a : b
                    const chosenWeight = chosenSnake.brain[i].weights[row][col]
                    layer.weights[row][col] = chosenWeight
                }
            }

            for (let j = 0; j < layer.biases.length; j++) {
                const chosenSnake = Math.random() < 0.5 ? a : b
                const chosenBias = chosenSnake.brain[i].biases[j]
                layer.biases[j] = chosenBias
            }
        }

        return offspring
    }

    mutate(offspring: Snake): void {
        for (let layer of offspring.brain) {
            for (let row = 0; row < layer.weights.length; row++) {
                for (let col = 0; col < layer.weights[row].length; col++) {
                    if (Math.random() < this.mutationRate) {
                        layer.weights[row][col] += randomGaussian()
                    }
                }
            }

            for (let j = 0; j < layer.biases.length; j++) {
                if (Math.random() < this.mutationRate) {
                    layer.biases[j] += randomGaussian()
                }
            }
        }
    }

}
