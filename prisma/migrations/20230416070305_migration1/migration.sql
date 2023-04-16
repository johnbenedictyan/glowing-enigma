-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cashBalance" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "openingHours" TEXT NOT NULL,
    "cashBalance" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "Dish" (
    "name" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    CONSTRAINT "Dish_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Purchase" (
    "userId" INTEGER NOT NULL,
    "dishName" TEXT NOT NULL,
    "dishRestaurantId" INTEGER NOT NULL,
    "transactionDate" DATETIME NOT NULL,
    CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Purchase_dishName_dishRestaurantId_fkey" FOREIGN KEY ("dishName", "dishRestaurantId") REFERENCES "Dish" ("name", "restaurantId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Dish_name_restaurantId_key" ON "Dish"("name", "restaurantId");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_userId_dishName_dishRestaurantId_transactionDate_key" ON "Purchase"("userId", "dishName", "dishRestaurantId", "transactionDate");
