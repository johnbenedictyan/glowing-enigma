/*
  Warnings:

  - You are about to drop the column `restaurantName` on the `Restaurant` table. All the data in the column will be lost.
  - Added the required column `name` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Restaurant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "openingHours" TEXT NOT NULL,
    "cashBalance" DECIMAL NOT NULL
);
INSERT INTO "new_Restaurant" ("cashBalance", "id", "openingHours") SELECT "cashBalance", "id", "openingHours" FROM "Restaurant";
DROP TABLE "Restaurant";
ALTER TABLE "new_Restaurant" RENAME TO "Restaurant";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
