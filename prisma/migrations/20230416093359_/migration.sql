-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cashBalance" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "cashBalance" DECIMAL NOT NULL,
    "openingHours" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Dish" (
    "name" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "restaurantName" TEXT NOT NULL,
    CONSTRAINT "Dish_restaurantName_fkey" FOREIGN KEY ("restaurantName") REFERENCES "Restaurant" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Purchase" (
    "userId" INTEGER NOT NULL,
    "dishName" TEXT NOT NULL,
    "dishRestaurantName" TEXT NOT NULL,
    "transactionAmount" DECIMAL NOT NULL,
    "transactionDate" DATETIME NOT NULL,
    CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Purchase_dishName_dishRestaurantName_fkey" FOREIGN KEY ("dishName", "dishRestaurantName") REFERENCES "Dish" ("name", "restaurantName") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Dish_name_restaurantName_key" ON "Dish"("name", "restaurantName");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_userId_dishName_dishRestaurantName_transactionDate_key" ON "Purchase"("userId", "dishName", "dishRestaurantName", "transactionDate");
