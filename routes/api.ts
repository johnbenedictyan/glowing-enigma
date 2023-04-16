import { Router } from "express";

import restaurantRouter from "./restaurant-router";

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use("/restaurants", restaurantRouter);

// *** Export default **** //

export default baseRouter;
