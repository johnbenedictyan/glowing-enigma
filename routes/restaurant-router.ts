import { PrismaClient } from '@prisma/client'
import { Request, Response, Router } from 'express'
import StatusCodes from 'http-status-codes'

import { decomposeDateTime } from '../util/decomposeDateTime'

// **** Variables **** //

// Misc
const router = Router()
const { CREATED, OK } = StatusCodes
const prisma = new PrismaClient()

// Paths
export const p = {
  get: '/all',
  top: '/top',
  search: '/search',
  handlePurchase: '/handlePurchase',
} as const

// **** Routes **** //

/**
 * Get all restaurants
 */
router.get(
  p.get,
  async (req: Request<{ openTill?: string }>, res: Response) => {
    const { openTill } = req.query
    const restaurants = await prisma.restaurant.findMany({})
    if (openTill) {
      const parsedOpenTill = decomposeDateTime(openTill as string)
      console.log(parsedOpenTill)
      restaurants.filter((r) =>
        r.openingHours.filter((oh) => oh.includes(parsedOpenTill.day))
      )
    }

    return res.status(OK).json({ restaurants })
  }
)

/**
 * Get top restaurants
 */
router.get(
  p.top,
  async (
    req: Request<{ noOfDishes?: number; minPrice?: number; maxPrice?: number }>,
    res: Response
  ) => {
    const { noOfDishes, minPrice, maxPrice } = req.params

    const restaurants = await prisma.restaurant.findMany({
      include: {
        menu: true,
      },
    })

    if (minPrice) {
      restaurants.map((x) => x.menu.filter((y) => y.price.lessThan(minPrice)))
    }

    if (maxPrice) {
      restaurants.map((x) => x.menu.filter((y) => !y.price.lessThan(maxPrice)))
    }

    if (noOfDishes) {
      restaurants.map((x) => x.menu.length < noOfDishes)
    }

    return res.status(OK).json({ restaurants })
  }
)

/**
 * Search restaurants
 */
router.get(
  p.search,
  async (req: Request<{ searchTerm?: string }>, res: Response) => {
    const { searchTerm } = req.params

    if (searchTerm) {
      const restaurants = await prisma.restaurant.findMany({
        where: {
          name: searchTerm,
        },
        include: {
          menu: true,
        },
        orderBy: {
          _relevance: {
            fields: ['name'],
            search: searchTerm,
            sort: 'asc',
          },
        },
      })
      return res.status(OK).json({ restaurants })
    } else {
      const restaurants = await prisma.restaurant.findMany()
      return res.status(OK).json({ restaurants })
    }
  }
)

// **** Export default **** //

export default router
