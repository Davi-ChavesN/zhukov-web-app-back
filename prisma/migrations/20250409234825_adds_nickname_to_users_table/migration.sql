/*
  Warnings:

  - Added the required column `nickname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nickname" TEXT NOT NULL,
ADD COLUMN     "user_role" TEXT NOT NULL DEFAULT 'user';
