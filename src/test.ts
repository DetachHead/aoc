import { Parts } from './types'
import { HasDefaultExport } from '@detachhead/ts-helpers/dist/utilityTypes/misc'
import { AocClient } from 'advent-of-code-client'
import * as dotenv from 'dotenv'
import { readdir } from 'fs/promises'
import path from 'path'
import { throwIfUndefined } from 'throw-expression'

dotenv.config()

const token = throwIfUndefined(process.env['TOKEN'])
const yearsDir = path.join(__dirname, 'years')

;(async () => {
    await Promise.all(
        (
            await readdir(yearsDir)
        ).map(async (year) => {
            const days = (await readdir(path.join(yearsDir, year))).filter((day) =>
                day.endsWith('.js'),
            )
            return Promise.all(
                days.map(async (day) => {
                    const dayName = path.parse(day).name
                    const client = new AocClient({
                        year: Number(year),
                        day: Number(dayName),
                        token,
                    })
                    const yearAndDayText = `year ${year}, day ${dayName}`
                    console.log(`checking ${yearAndDayText}`)
                    const parts = (
                        (await import(path.join(yearsDir, year, dayName))) as HasDefaultExport
                    ).default as Parts
                    try {
                        await client.run(parts, true)
                    } catch (e) {
                        if (
                            e instanceof Error &&
                            e.message.includes('Did you already complete it?')
                        ) {
                            console.log(yearAndDayText, 'already completed :)')
                            return
                        }
                        throw e
                    }
                }),
            )
        }),
    )
    console.log('done')
    process.exit(0)
})()
