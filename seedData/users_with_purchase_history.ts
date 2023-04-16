import { IUser } from '../prisma/seed'

const userSeedData: IUser[] = [
  {
    cashBalance: 600.36,
    id: 52,
    name: 'Lillie Hicks',
    purchaseHistory: [
      {
        dishName: 'Baked Weakfish with Boiled Potatoes',
        dishRestaurantName: '024 Grille',
        transactionAmount: 10.25,
        transactionDate: '01/17/2019 06:47 PM',
      },
    ],
  },
  {
    cashBalance: 947.42,
    id: 150,
    name: 'Tomas Brown',
    purchaseHistory: [
      {
        dishName: 'DRY LIGHT IMPORTED WINE',
        dishRestaurantName: "'Ulu Ocean Grill and Sushi Lounge",
        transactionAmount: 13.5,
        transactionDate: '04/07/2019 11:47 AM',
      },
    ],
  },
]

export default userSeedData
