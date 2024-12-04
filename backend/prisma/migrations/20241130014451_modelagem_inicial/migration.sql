/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Cliente" (
    "idCliente" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("idCliente")
);

-- CreateTable
CREATE TABLE "Proprietario" (
    "idProprietario" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Proprietario_pkey" PRIMARY KEY ("idProprietario")
);

-- CreateTable
CREATE TABLE "Quadra" (
    "idQuadra" SERIAL NOT NULL,
    "nomeQuadra" TEXT NOT NULL,
    "precoHora" DOUBLE PRECISION NOT NULL,
    "localizacao" TEXT NOT NULL,
    "fotos" TEXT[],
    "proprietarioId" INTEGER NOT NULL,

    CONSTRAINT "Quadra_pkey" PRIMARY KEY ("idQuadra")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "idReserva" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clienteId" INTEGER NOT NULL,
    "transacaoId" INTEGER NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("idReserva")
);

-- CreateTable
CREATE TABLE "Transacao" (
    "idTransacao" SERIAL NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "metodoPagamento" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transacao_pkey" PRIMARY KEY ("idTransacao")
);

-- CreateTable
CREATE TABLE "Review" (
    "idReview" SERIAL NOT NULL,
    "nota" DOUBLE PRECISION NOT NULL,
    "titulo" TEXT NOT NULL,
    "comentario" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quadraId" INTEGER NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("idReview")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Proprietario_email_key" ON "Proprietario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Reserva_data_key" ON "Reserva"("data");

-- CreateIndex
CREATE UNIQUE INDEX "Reserva_clienteId_key" ON "Reserva"("clienteId");

-- CreateIndex
CREATE UNIQUE INDEX "Reserva_transacaoId_key" ON "Reserva"("transacaoId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_quadraId_key" ON "Review"("quadraId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_clienteId_key" ON "Review"("clienteId");

-- AddForeignKey
ALTER TABLE "Quadra" ADD CONSTRAINT "Quadra_proprietarioId_fkey" FOREIGN KEY ("proprietarioId") REFERENCES "Proprietario"("idProprietario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("idCliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_transacaoId_fkey" FOREIGN KEY ("transacaoId") REFERENCES "Transacao"("idTransacao") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_quadraId_fkey" FOREIGN KEY ("quadraId") REFERENCES "Quadra"("idQuadra") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("idCliente") ON DELETE RESTRICT ON UPDATE CASCADE;
