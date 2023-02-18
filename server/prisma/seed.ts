import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const firstHabitId = "2b0dcffe-76f5-489d-86b5-641752c462e3";
const firstHabitDate = new Date('2022-12-01T03:00:00.000z');

const secondHabitId = "7a39d090-e308-4363-a5e9-276e883233a6";
const secondHabitDate = new Date('2023-01-03T03:00:00.000z');

const thirdHabitId = "2fe54de5-fa0e-4864-9e69-ceb4d460d27d";
const thirdHabitDate = new Date('2023-01-08T03:00:00.000z');


async function main() {
    await prisma.habitWeekDays.deleteMany()
    await prisma.dayHabit.deleteMany()
    await prisma.habit.deleteMany()
    await prisma.day.deleteMany()

    await prisma.habit.create({
        data: {
            id: firstHabitId,
            title: 'Drink water',
            created_at: firstHabitDate,
            weekDays: {
                create: [
                    { week_day: 1 },
                    { week_day: 2 },
                    { week_day: 3 },

                ]
            }
        }
    })
    await prisma.habit.create({
        data: {
            id: secondHabitId,
            title: 'Exercise',
            created_at: secondHabitDate,
            weekDays: {
                create: [
                    { week_day: 3 },
                    { week_day: 4 },
                    { week_day: 5 },

                ]
            }
        }
    })
    await prisma.habit.create({
        data: {
            id: thirdHabitId,
            title: 'Code',
            created_at: thirdHabitDate,
            weekDays: {
                create: [
                    { week_day: 1 },
                    { week_day: 2 },
                    { week_day: 3 },
                    { week_day: 4 },
                    { week_day: 5 },

                ]
            }
        }
    })

    await Promise.all([
        prisma.day.create({
            data: {
                date: new Date('2023-01-02T04:00:00.000z'),
                dayHabits: {
                    create: {
                        habit_id: firstHabitId
                    }
                }
            }
        }),
        prisma.day.create({
            data: {
                date: new Date('2023-01-06T04:00:00.000z'),
                dayHabits: {
                    create: {
                        habit_id: firstHabitId
                    }
                }
            }
        }),
        prisma.day.create({
            data: {
                date: new Date('2023-01-04T04:00:00.000z'),
                dayHabits: {
                    create: [
                        { habit_id: firstHabitId },
                        { habit_id: secondHabitId },
                    ]
                }
            }
        }),
    ])
}

main()
    .then(async () =>{
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });