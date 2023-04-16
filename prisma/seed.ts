import { Prisma, PrismaClient } from '@prisma/client';
import jsonfile from 'jsonfile';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [];
const restaurantData: Prisma.RestaurantCreateInput[] = [];

async function main() {
  console.log(`Start seeding ...`);
  jsonfile.readFile(
    "./seedData/restaurant_with_menu.json",
    async function (err, obj) {
      if (err) console.error(err);
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
        });
        console.log(`Upsert restaurant with id: ${restaurant.id}`);
      }
    }
  );
  //   for (const r of restaurantData) {
  //     const restaurant = await prisma.user.create({
  //       data: r,
  //     });
  //     console.log(`Created restaurant with id: ${restaurant.id}`);
  //   }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
