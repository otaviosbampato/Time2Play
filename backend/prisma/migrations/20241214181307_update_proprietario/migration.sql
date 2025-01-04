/*
  Warnings:

  - A unique constraint covering the columns `[cpfCnpj]` on the table `Proprietario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cidade` to the `Proprietario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpfCnpj` to the `Proprietario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Proprietario" ADD COLUMN     "cidade" TEXT NOT NULL,
ADD COLUMN     "cpfCnpj" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Proprietario_cpfCnpj_key" ON "Proprietario"("cpfCnpj");
