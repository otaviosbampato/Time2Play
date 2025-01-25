/*
  Warnings:

  - The `fotos` column on the `Quadra` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Quadra" DROP COLUMN "fotos",
ADD COLUMN     "fotos" JSONB NOT NULL DEFAULT '[]';
