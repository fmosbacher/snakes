export default class Vector2d {

    x: number
    y: number

    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }

    add(other: Vector2d): void {
        this.x += other.x
        this.y += other.y
    }

    dist(other: Vector2d): number {
        const xDelta = this.x - other.x
        const yDelta = this.y - other.y
        return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2))
    }

    isEqual(other: Vector2d): boolean {
        return this.dist(other) < 1e-06
    }

}