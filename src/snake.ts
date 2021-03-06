import Vector2d from './vector2d'
import DenseLayer from './dense-layer'

export default class Snake {

    body: Vector2d[]
    brain: DenseLayer[]
    maxMoves: number
    remainingMoves: number

    score: number = 0
    isAlive: boolean = true

    constructor(initialPos: Vector2d, maxMoves: number) {
        this.body = [initialPos]
        this.brain = [
            new DenseLayer(8, 8),
            new DenseLayer(8, 4)
        ]
        this.maxMoves = maxMoves
        this.remainingMoves = maxMoves
    }

    predictMove(state: number[]): Vector2d {
        let inputs = state
        let outputs: number[]
        const possibleDirections = [
            new Vector2d(0, -1),
            new Vector2d(1, 0),
            new Vector2d(0, 1),
            new Vector2d(-1, 0)
        ]

        for (const layer of this.brain) {
            outputs = layer.activate(inputs)
            inputs = outputs
        }

        const dirIndex = outputs.indexOf(Math.max(...outputs))

        return possibleDirections[dirIndex]
    }

    move(direction: Vector2d): void {
        const head = this.body[0]
        const nextHead = new Vector2d(head.x, head.y)
        nextHead.add(direction)
        const tailWithoutLast = this.body.slice(0, -1)

        this.body = [nextHead].concat(tailWithoutLast)
        this.remainingMoves -= 1

        if (this.remainingMoves < 0) {
            this.isAlive = false
        }
    }

    checkCollisions(boardSize: number): void {
        const head = this.body[0]
        const tail = this.body.slice(1)

        for (const part of tail) {
            if (head.isEqual(part)) {
                this.isAlive = false
            }
        }

        if (head.x >= boardSize || head.x < 0) {
            this.isAlive = false
        }

        if (head.y >= boardSize || head.y < 0) {
            this.isAlive = false
        }
    }

    grow(): void {
        const lastPart = this.body[this.body.length - 1]
        const newBodyPart = new Vector2d(
            lastPart.x,
            lastPart.y
        )
        this.body.push(newBodyPart)
    }

}