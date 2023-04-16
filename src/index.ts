import { PrismaClient } from '@prisma/client'
import express, { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import apiRouter from '../routes/api'
import { CustomError } from '../shared/errors'

export const prisma = new PrismaClient()
export const app = express()

app.use(express.json())

// Add api router
app.use('/api', apiRouter)

// Error handling
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(
  (err: Error | CustomError, req: Request, res: Response, _: NextFunction) => {
    const status =
      err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST
    return res.status(status).json({
      error: err.message,
    })
  }
)
const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
)
