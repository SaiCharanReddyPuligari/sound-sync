-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "imageBigUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "imageSmallUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '';
