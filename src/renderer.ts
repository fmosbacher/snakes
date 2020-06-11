import Game from './game'

type Screen = {
    width: number,
    height: number
}

export default class Renderer {

    game: Game
    screen: Screen
    ctx: CanvasRenderingContext2D
    stepSize: number
    gridSize: number

    constructor(game: Game, canvas: HTMLCanvasElement) {
        this.game = game
        this.ctx = canvas.getContext('2d')
        this.screen = {
            width: canvas.width,
            height: canvas.height
        }
    }

    drawGrid(): void {
        const numRows = Math.ceil(Math.sqrt(this.game.pairs.length))
        const numCols = numRows
        const gridSize = this.screen.width / numRows

        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                let color

                if ((i + j) % 2) {
                    color = '#fff'
                } else {
                    color = '#fafafa'
                }

                this.drawRect(i * gridSize, j * gridSize, gridSize, color)
            }
        }
    }

    drawSnakes(): void {
        const snakes = this.game.pairs.map(pair => pair.snake)
        const numCols = Math.ceil(Math.sqrt(this.game.pairs.length))
        const gridSize = this.screen.width / numCols
        const stepSize = gridSize / this.game.boardSize

        for (let i = 0; i < snakes.length; i++) {
            if (snakes[i].isAlive) {
                const xOffset = i % numCols
                const yOffset = Math.floor(i / numCols)

                for (let part of snakes[i].body) {
                    this.drawRect(
                        xOffset * gridSize + part.x * stepSize,
                        yOffset * gridSize + part.y * stepSize,
                        stepSize,
                        '#0f0'
                    )
                }
            }
        }
    }

    drawFoods(): void {
        const foods = this.game.pairs.map(pair => pair.food)
        const numCols = Math.ceil(Math.sqrt(this.game.pairs.length))
        const gridSize = this.screen.width / numCols
        const stepSize = gridSize / this.game.boardSize

        for (let i = 0; i < foods.length; i++) {
            if (this.game.pairs[i].snake.isAlive) {
                const xOffset = i % numCols
                const yOffset = Math.floor(i / numCols)

                this.drawRect(
                    xOffset * gridSize + foods[i].position.x * stepSize,
                    yOffset * gridSize + foods[i].position.y * stepSize,
                    stepSize,
                    '#f00'
                )
            }
        }
    }

    drawRect(x: number, y: number, size: number, color: string): void {
        this.ctx.fillStyle = color
        this.ctx.fillRect(
            x,
            y,
            size,
            size
        )
    }

}