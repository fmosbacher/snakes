import Game from './game'
import Snake from './snake'
import Food from './food'
import Evolution from './evolution'
import Renderer from './renderer'

const getInputValue = (id: string): number => {
    return parseInt((document.querySelector(id) as HTMLInputElement).value)
}

let boardSize: number
let populationSize: number
let maxMoves: number
let frameSpeed: number
let mutationRate: number
let game: Game
let evolution: Evolution
let renderer: Renderer
let generation = 1

document.querySelector('button')
    .addEventListener('click', () => {
        boardSize = getInputValue('#board-size')
        populationSize = getInputValue('#population-size')
        maxMoves = getInputValue('#max-moves')
        mutationRate = getInputValue('#mutation-rate') / 100
        // TODO
        // frameSpeed = getInputValue('#frame-speed')

        game = new Game(boardSize)
        evolution = new Evolution(game, mutationRate)

        const canvas = document.querySelector('canvas')
        const body = document.querySelector('body')
        canvas.width = canvas.height = body.clientHeight * 0.9;

        renderer = new Renderer(game, canvas)

        for (let i = 0; i < populationSize; i++) {
            const snakeInitialPos = game.getRandomPosition()
            const foodInitialPos = game.getRandomPosition()
            game.addPair(new Snake(snakeInitialPos, maxMoves), new Food(foodInitialPos))
        }

        run()
    })

const run = (): void => {
    renderer.drawGrid()
    renderer.drawSnakes()
    renderer.drawFoods()

    game.runStep()

    if (game.isOver) {
        console.log(`Gen ${generation} best score: ${game.getBestScore()}`)
        evolution.updateGeneration()
        generation += 1
    }

    requestAnimationFrame(run)
}