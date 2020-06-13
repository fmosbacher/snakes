export const randomGaussian = (): number => {
    let sum = 0

    for (let i = 0; i < 20; i++) {
        sum += Math.random() * 6 - 3
    }

    return sum / 20
}