/*
  Warnings:

  - You are about to drop the column `rating` on the `Media` table. All the data in the column will be lost.
  - Added the required column `banner_url` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trailer_url` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Media" DROP COLUMN "rating",
ADD COLUMN     "banner_url" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "score" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "trailer_url" TEXT NOT NULL;
