import { PrismaClient } from '@prisma/client'

import restaurantSeedData from '../seedData/restaurant_with_menu'
import userSeedData from '../seedData/users_with_purchase_history'

const prisma = new PrismaClient()

export interface IMenuItem {
  name: string
  price: number
}

export interface IRestaurant {
  cashBalance: number
  openingHours: string
  name: string
  menu: IMenuItem[]
}

export interface IPurchaseHistory {
  dishName: string
  dishRestaurantName: string
  transactionAmount: number
}

interface IParsedPurchaseHistory extends IPurchaseHistory {
  transactionDate: Date
}

interface IUnparsedPurchaseHistory extends IPurchaseHistory {
  transactionDate: string
}
export interface IUser {
  cashBalance: number
  id: number
  name: string
  purchaseHistory: IUnparsedPurchaseHistory[]
}

async function seedRestaurants() {
  console.log(`Start seeding restaurant data ...`)
  await Promise.all(
    restaurantSeedData.map(async (r) => {
      prisma.restaurant.upsert({
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
    })
  )
}

async function seedUsers() {
  console.log(`Start seeding user data ...`)
  await Promise.all(
    userSeedData.map(async (u) => {
      const currUserPurchaseHistory: IUnparsedPurchaseHistory[] =
        u.purchaseHistory
      const parsedCurrUserPH: IParsedPurchaseHistory[] =
        currUserPurchaseHistory.map((x) => {
          return {
            dishName: x.dishName,
            dishRestaurantName: x.dishRestaurantName,
            transactionAmount: x.transactionAmount,
            transactionDate: new Date(x.transactionDate),
          }
        })
      prisma.user.upsert({
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
    })
  )
}

async function main() {
  console.log(`Start seeding ...`)

  await seedRestaurants()

  await seedUsers()
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
