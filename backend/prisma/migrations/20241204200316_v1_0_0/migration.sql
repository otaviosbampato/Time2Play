/*
  Warnings:

  - You are about to drop the column `localizacao` on the `Quadra` table. All the data in the column will be lost.
  - Added the required column `cidade` to the `Quadra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `Quadra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Quadra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quadra" DROP COLUMN "localizacao",
ADD COLUMN     "cidade" TEXT NOT NULL,
ADD COLUMN     "endereco" TEXT NOT NULL,
ADD COLUMN     "estado" TEXT NOT NULL;
