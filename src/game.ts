import Food from './food'
import Vector2d from './vector2d'
import Snake from './snake'

type Pair = {
    snake: Snake,
    food: Food
}

export default class Game {

    boardSize: number

    isOver: boolean = false
    pairs: Pair[] = []

    constructor(boardSize: number) {
        this.boardSize = boardSize
    }

    addPair(snake: Snake, food: Food): void {
        this.pairs.push({
            snake,
            food
        })
    }

    getRandomPosition(): Vector2d {
        const x = Math.floor(Math.random() * this.boardSize)
        const y = Math.floor(Math.random() * this.boardSize)
        return new Vector2d(x, y)
    }

    clearPopulation(): void {
        this.pairs = []
    }

    getBestScore(): number {
        return Math.max(...this.pairs.map(pair => pair.snake.score))
    }

    runStep(): void {
        const availablePairs = this.pairs.filter(pair => pair.snake.isAlive)

        if (availablePairs.length === 0) {
            this.isOver = true
            return
        }

        for (let pair of availablePairs) {
            const state = this.getObservation(pair)
            const direction = pair.snake.predictMove(state)

            pair.snake.move(direction)

            pair.snake.checkCollisions(this.boardSize)
            this.feedSnake(pair)
        }
    }

    getObservation(pair: Pair): number[] {
        const head = pair.snake.body[0]
        const tail = pair.snake.body.slice(1)

        const foodIsUp = head.y > pair.food.position.y
        const foodIsRight = head.x < pair.food.position.x
        let hasObstacleAbove = false
        let hasObstacleRight = false
        let hasObstacleBelow = false
        let hasObstacleLeft = false

        // Own tail
        for (let part of tail) {
            if (head.x === part.x) {
                if (head.y + 1 === part.y) {
                    hasObstacleBelow = true
                } else if (head.y - 1 === part.y) {
                    hasObstacleAbove = true
                }
            }

            if (head.y === part.y) {
                if (head.x + 1 === part.x) {
                    hasObstacleRight = true
                } else if (head.x - 1 === part.x) {
                    hasObstacleLeft = true
                }
            }
        }

        // Walls
        if (head.y - 1 === -1) {
            hasObstacleAbove = true
        } else if (head.y + 1 === this.boardSize) {
            hasObstacleBelow = true
        }

        if (head.x + 1 === this.boardSize) {
            hasObstacleRight = true
        } else if (head.x - 1 === -1) {
            hasObstacleLeft = true
        }

        return [
            foodIsUp ? 1 : 0,
            foodIsRight ? 1 : 0,
            hasObstacleAbove ? 1 : 0,
            hasObstacleRight ? 1 : 0,
            hasObstacleBelow ? 1 : 0,
            hasObstacleLeft ? 1 : 0
        ]
    }

    getRandomFoodPosition(snake: Snake): Vector2d {
        const foodPosition = this.getRandomPosition()

        for (let part of snake.body) {
            if (foodPosition.isEqual(part)) {
                return this.getRandomFoodPosition(snake)
            }
        }

        return foodPosition
    }

    feedSnake(pair: Pair): void {
        const head = pair.snake.body[0]

        if (head.isEqual(pair.food.position)) {
            pair.snake.grow()
            pair.snake.score += 1
            const foodInitialPos = this.getRandomFoodPosition(pair.snake)
            pair.food = new Food(foodInitialPos)
        }
    }

}