-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cashBalance" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "name" TEXT NOT NULL,
    "cashBalance" DECIMAL(65,30) NOT NULL,
    "openingHours" TEXT[],

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Dish" (
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "restaurantName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Purchase" (
    "userId" INTEGER NOT NULL,
    "dishName" TEXT NOT NULL,
    "dishRestaurantName" TEXT NOT NULL,
    "transactionAmount" DECIMAL(65,30) NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Dish_name_restaurantName_key" ON "Dish"("name", "restaurantName");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_userId_dishName_dishRestaurantName_transactionDate_key" ON "Purchase"("userId", "dishName", "dishRestaurantName", "transactionDate");

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_restaurantName_fkey" FOREIGN KEY ("restaurantName") REFERENCES "Restaurant"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_dishName_dishRestaurantName_fkey" FOREIGN KEY ("dishName", "dishRestaurantName") REFERENCES "Dish"("name", "restaurantName") ON DELETE RESTRICT ON UPDATE CASCADE;
