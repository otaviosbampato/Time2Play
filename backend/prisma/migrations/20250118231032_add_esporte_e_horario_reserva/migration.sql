/*
  Warnings:

  - Added the required column `quadraId` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quadra" ADD COLUMN     "esporte" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Reserva" ADD COLUMN     "quadraId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ReservaHorario" (
    "idHorario" SERIAL NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "reservaId" INTEGER NOT NULL,

    CONSTRAINT "ReservaHorario_pkey" PRIMARY KEY ("idHorario")
);

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_quadraId_fkey" FOREIGN KEY ("quadraId") REFERENCES "Quadra"("idQuadra") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaHorario" ADD CONSTRAINT "ReservaHorario_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "Reserva"("idReserva") ON DELETE RESTRICT ON UPDATE CASCADE;
