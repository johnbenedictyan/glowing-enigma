import { PrismaClient } from '@prisma/client';
import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';

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
router.get(p.get, async (req: Request, res: Response) => {
  const { openTill } = req.params
  const restaurants = await prisma.restaurant.findMany()
  return res.status(OK).json({ restaurants })
})

// **** Export default **** //

export default router
