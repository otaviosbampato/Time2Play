-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CONCLUIDO', 'AGUARDANDO', 'CANCELADO');

-- DropIndex
DROP INDEX "Reserva_clienteId_key";

-- DropIndex
DROP INDEX "Reserva_data_key";

-- DropIndex
DROP INDEX "Review_clienteId_key";

-- DropIndex
DROP INDEX "Review_quadraId_key";
