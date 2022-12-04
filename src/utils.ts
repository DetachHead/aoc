export const addNumbers = (numbers: number[]): number =>
    numbers.reduce((prev, next) => prev + next, 0)
