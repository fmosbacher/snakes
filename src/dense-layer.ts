export default class DenseLayer {

    numInputs: number
    numOutputs: number
    weights: number[][]
    biases: number[]

    constructor(numInputs: number, numOutputs: number) {
        this.numInputs = numInputs
        this.numOutputs = numOutputs
        this.weights = this.initWeights()
        this.biases = this.initBiases()
    }

    initWeights(): number[][] {
        let weights = []

        for (let i = 0; i < this.numInputs; i++) {
            weights[i] = []

            for (let j = 0; j < this.numOutputs; j++) {
                weights[i].push(Math.random() * 2 - 1)
            }
        }

        return weights
    }

    initBiases(): number[] {
        let biases = []

        for (let i = 0; i < this.numOutputs; i++) {
            biases.push(Math.random() * 2 - 1)
        }

        return biases
    }

    activate(inputs: number[]): number[] {
        let result = []

        for (let i = 0; i < this.numOutputs; i++) {
            result[i] = 0

            for (let j = 0; j < inputs.length; j++) {
                result[i] += inputs[j] * this.weights[j][i]
            }

            result[i] += this.biases[i]
        }

        return result
    }

}