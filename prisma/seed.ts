import { PrismaClient } from '@prisma/client';

import restaurantSeedData from '../seedData/restaurant_with_menu';
import userSeedData from '../seedData/users_with_purchase_history';

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
  transactionDate: string | Date
}

export interface IUser {
  cashBalance: number
  id: number
  name: string
  purchaseHistory: IPurchaseHistory[]
}

async function seedRestaurants() {
  console.log(`Start seeding restaurant data ...`)
  await Promise.all(
    restaurantSeedData.map(async (r) => {
      await prisma.restaurant.upsert({
        where: {
          name: r.name,
        },
        update: {},
        create: {
          name: r.name,
          cashBalance: r.cashBalance,
          openingHours: r.openingHours.split('/').map((y) => {
            return y.trim()
          }),
          menu: {
            connectOrCreate: r.menu.map((menu) => {
              return {
                where: {
                  name_restaurantName: {
                    name: menu.name,
                    restaurantName: r.name,
                  },
                },
                create: {
                  name: menu.name,
                  price: menu.price,
                },
              }
            }),
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
      await prisma.user.upsert({
        where: { id: u.id },
        update: {},
        create: {
          id: u.id,
          name: u.name,
          cashBalance: u.cashBalance,
          purchaseHistory: {
            connectOrCreate: u.purchaseHistory.map((ph) => {
              return {
                where: {
                  userId_dishName_dishRestaurantName_transactionDate: {
                    userId: u.id,
                    dishName: ph.dishName,
                    dishRestaurantName: ph.dishName,
                    transactionDate: new Date(ph.transactionDate),
                  },
                },
                create: {
                  dishName: ph.dishName,
                  dishRestaurantName: ph.dishRestaurantName,
                  transactionAmount: ph.transactionAmount,
                  transactionDate: new Date(ph.transactionDate),
                },
              }
            }),
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
