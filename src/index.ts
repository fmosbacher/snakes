import Game from './game'
import Snake from './snake'
import Food from './food'
import Evolution from './evolution'
import Renderer from './renderer'

const boardSize = 10
const populationSize = Math.pow(15, 2)
const maxMoves = 700

const game = new Game(boardSize)
const evolution = new Evolution(game, 0.05)

const canvas = document.querySelector('canvas')
const renderer = new Renderer(game, canvas)

for (let i = 0; i < populationSize; i++) {
    const snakeInitialPos = game.getRandomPosition()
    const foodInitialPos = game.getRandomPosition()
    game.addPair(new Snake(snakeInitialPos, maxMoves), new Food(foodInitialPos))
}

let generation = 1
let interval: number

const evolve = (): void => {
    clearInterval(interval)
    console.log(`Gen ${generation} best score: ${game.getBestScore()}`)
    evolution.updateGeneration()
    run()
}

const run = (): void => {
    interval = setInterval(() => {
        renderer.drawGrid()
        renderer.drawSnakes()
        renderer.drawFoods()

        game.runStep()

        if (game.isOver) {
            evolve()
            generation += 1
        }
    }, 1)
}

run()
