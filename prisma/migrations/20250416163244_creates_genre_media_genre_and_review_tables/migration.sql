/*
  Warnings:

  - You are about to drop the column `average_score` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `banner_url` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `episode_duration` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `episodes` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `format` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `genres` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `original_title` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `season` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `studios` on the `Media` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nickname]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `director` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster_url` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `producer` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release_year` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Media` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Media" DROP COLUMN "average_score",
DROP COLUMN "banner_url",
DROP COLUMN "description",
DROP COLUMN "end_date",
DROP COLUMN "episode_duration",
DROP COLUMN "episodes",
DROP COLUMN "format",
DROP COLUMN "genres",
DROP COLUMN "image_url",
DROP COLUMN "original_title",
DROP COLUMN "season",
DROP COLUMN "start_date",
DROP COLUMN "status",
DROP COLUMN "studios",
ADD COLUMN     "director" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "poster_url" TEXT NOT NULL,
ADD COLUMN     "producer" TEXT NOT NULL,
ADD COLUMN     "rating" TEXT NOT NULL,
ADD COLUMN     "release_year" INTEGER NOT NULL,
ALTER COLUMN "title" SET NOT NULL;

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaGenre" (
    "genre_id" TEXT NOT NULL,
    "media_id" TEXT NOT NULL,

    CONSTRAINT "MediaGenre_pkey" PRIMARY KEY ("genre_id","media_id")
);

-- CreateTable
CREATE TABLE "Review" (
    "user_id" TEXT NOT NULL,
    "media_id" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "comment" TEXT,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("user_id","media_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

-- AddForeignKey
ALTER TABLE "MediaGenre" ADD CONSTRAINT "MediaGenre_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaGenre" ADD CONSTRAINT "MediaGenre_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
