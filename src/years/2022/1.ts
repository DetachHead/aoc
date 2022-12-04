import { addNumbers } from '../../utils'
import { PartFn } from 'advent-of-code-client/dist/AocClient.types'
import { throwIfUndefined } from 'throw-expression'

const allScores = (input: unknown) =>
    (input as string)
        .split('\n\n')
        .map((values) => addNumbers(values.split('\n').map(Number)))
        .sort((a, b) => b - a)

const part1: PartFn = (input: unknown): number => throwIfUndefined(allScores(input)[0])

const part2: PartFn = (input) => addNumbers(allScores(input).slice(0, 3))

export default [part1, part2]
