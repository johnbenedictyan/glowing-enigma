import { Router } from "express";

import restaurantRouter from "./restaurant-router";

// Export the base-router
const apiRouter = Router();

// Setup routers
apiRouter.use("/restaurants", restaurantRouter);

// *** Export default **** //

export default apiRouter;
