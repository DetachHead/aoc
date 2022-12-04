import { addNumbers } from '../../utils'
import { PartFn } from 'advent-of-code-client/dist/AocClient.types'

// WARING!!!!!!! this one sucks!! i didnt realize the rock/paper/scisors hierarchy could be represented in a sequence so i ended up with this mess
// it's also gross cuz i tried to reuse code for both parts...

/**
 * in part 1 it means your choice
 * in part 2 it means desired outcome (X = you lose, Y = draw, Z = you win)
 */
type YourChoiceOrDesiredOutcome = 'X' | 'Y' | 'Z'

type TheirChoice = 'A' | 'B' | 'C'

type Round = [TheirChoice, YourChoiceOrDesiredOutcome]

enum Outcome {
    YOU_LOST = 0,
    DRAW = 3,
    YOU_WON = 6,
}

const letterToOutcome = (letter: YourChoiceOrDesiredOutcome): Outcome => {
    switch (letter) {
        case 'X':
            return Outcome.YOU_LOST
        case 'Y':
            return Outcome.DRAW
        case 'Z':
            return Outcome.YOU_WON
    }
}

enum Answer {
    ROCK = 1,
    PAPER = 2,
    SCISSORS = 3,
}

const letterToChoice = (letter: YourChoiceOrDesiredOutcome | TheirChoice): Answer => {
    switch (letter) {
        case 'A':
        case 'X':
            return Answer.ROCK
        case 'B':
        case 'Y':
            return Answer.PAPER
        case 'C':
        case 'Z':
            return Answer.SCISSORS
    }
}

const choiceFromDesiredOutcome = (theirChoice: Answer, outcome: Outcome): Answer => {
    switch (outcome) {
        case Outcome.YOU_LOST:
            switch (theirChoice) {
                case Answer.ROCK:
                    return Answer.SCISSORS
                case Answer.PAPER:
                    return Answer.ROCK
                case Answer.SCISSORS:
                    return Answer.PAPER
            }
        case Outcome.DRAW:
            return theirChoice
        case Outcome.YOU_WON:
            switch (theirChoice) {
                case Answer.ROCK:
                    return Answer.PAPER
                case Answer.PAPER:
                    return Answer.SCISSORS
                case Answer.SCISSORS:
                    return Answer.ROCK
            }
    }
}

const getOutcome = (them: Answer, you: Answer): Outcome => {
    switch (you) {
        case them:
            return Outcome.DRAW
        case Answer.ROCK:
            return them === Answer.SCISSORS ? Outcome.YOU_WON : Outcome.YOU_LOST
        case Answer.PAPER:
            return them === Answer.SCISSORS ? Outcome.YOU_LOST : Outcome.YOU_WON
        case Answer.SCISSORS:
            return them === Answer.PAPER ? Outcome.YOU_WON : Outcome.YOU_LOST
        default:
            throw new Error(`epic fail. what is ${them}???`)
    }
}

const run = (input: string, getScore: (round: Round) => number) => {
    const strategyGuide = input.split('\n').map((row) => row.split(' ') as Round)
    return addNumbers(strategyGuide.map(getScore))
}

const part1: PartFn = (input) =>
    run(
        input as string,
        ([them, you]) =>
            letterToChoice(you) + getOutcome(letterToChoice(them), letterToChoice(you)),
    )

const part2: PartFn = (input) =>
    run(input as string, ([them, desiredOutcome]: Round) => {
        const theirChoice = letterToChoice(them)
        const yourChoice = choiceFromDesiredOutcome(theirChoice, letterToOutcome(desiredOutcome))
        return yourChoice + getOutcome(theirChoice, yourChoice)
    })

export default [part1, part2]
