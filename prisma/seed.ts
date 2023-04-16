import { PrismaClient } from '@prisma/client'
import jsonfile from 'jsonfile'

const prisma = new PrismaClient()

type PurchaseHistoryDTO = {
  dishName: string
  dishRestaurantName: string
  transactionAmount: number
  transactionDate: string | Date
}

type ParsedPurchaseHistoryDTO = {
  dishName: string
  dishRestaurantName: string
  transactionAmount: number
  transactionDate: Date
}

async function seedRestaurants() {
  console.log(`Start seeding restaurant data ...`)
  jsonfile.readFile(
    './seedData/restaurant_with_menu.json',
    async function (err, obj) {
      if (err) console.error(err)
      for (const r of obj) {
        const restaurant = await prisma.restaurant.upsert({
          where: { name: r.name },
          update: {},
          create: {
            name: r.name,
            openingHours: r.openingHours,
            cashBalance: r.cashBalance,
            menu: {
              create: r.menu,
            },
          },
        })
        console.log(`Upsert restaurant with id: ${restaurant.name}`)
      }
    }
  )
}

async function seedUsers() {
  console.log(`Start seeding user data ...`)
  jsonfile.readFile(
    './seedData/users_with_purchase_history.json',
    async function (err, obj) {
      if (err) console.error(err)
      for (const u of obj) {
        const currUserPurchaseHistory: PurchaseHistoryDTO[] = u.purchaseHistory
        const parsedCurrUserPH: ParsedPurchaseHistoryDTO[] =
          currUserPurchaseHistory.map((x) => {
            return {
              dishName: x.dishName,
              dishRestaurantName: x.dishRestaurantName,
              transactionAmount: x.transactionAmount,
              transactionDate: new Date(x.transactionDate),
            }
          })
        const user = await prisma.user.upsert({
          where: { id: u.id },
          update: {},
          create: {
            id: u.id,
            name: u.name,
            cashBalance: u.cashBalance,
            purchaseHistory: {
              create: parsedCurrUserPH,
            },
          },
        })
        console.log(`Upsert user with id: ${user.id}`)
      }
    }
  )
}

async function main() {
  console.log(`Start seeding ...`)

  await seedRestaurants();

  await seedUsers();
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
