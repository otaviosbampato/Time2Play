import express, { Request, Response } from "express";
import prisma from "../model/prisma";

const router = express.Router();

interface CreateReservaRequest {
  clienteId: number;
  quadraId: number;
  horarios: {
    dataInicio: string;
    dataFim: string;
  }[];
}

interface UpdateReservaRequest {
  reservaId: number;
  horarios?: {
    dataInicio: string;
    dataFim: string;
  }[];
}

export const realizarReserva = async (req: Request, res: Response) => {
  try {
    const { clienteId, quadraId, horarios }: CreateReservaRequest = req.body;

    console.log(quadraId)
    const quadra = await prisma.quadra.findUnique({
      where: { idQuadra: quadraId }
    });

    if (!quadra) {
      return res.status(404).json({ error: "Quadra não encontrada" });
    }

    const valorTotal = horarios.reduce((total, horario) => {
      const inicio = new Date(horario.dataInicio);
      const fim = new Date(horario.dataFim);
      const horas = (fim.getTime() - inicio.getTime()) / (1000 * 60 * 60);
      return total + (horas * quadra.precoHora);
    }, 0);

    const metodoPagamentos = ["PIX", "Cartão de Crédito", "Cartão de Débito", "Dinheiro"];
    const metodoPagamento = metodoPagamentos[Math.floor(Math.random() * metodoPagamentos.length)];
    
    const transacao = await prisma.transacao.create({
      data: {
        valor: valorTotal,
        status: "aguardando pagamento",
        metodoPagamento,
      }
    });

    const reserva = await prisma.reserva.create({
      data: {
        clienteId,
        quadraId,
        transacaoId: transacao.idTransacao,
        horarios: {
          create: horarios.map(horario => ({
            dataInicio: new Date(horario.dataInicio),
            dataFim: new Date(horario.dataFim)
          }))
        }
      },
      include: {
        horarios: true,
        quadra: true,
        transacao: true
      }
    });

    res.status(201).json(reserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar reserva" });
  }
};

// CLIENTE cancelar
export const cancelarReserva = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clienteId = req.id;
    const isAdm = req.isAdm;

    //

    const reserva = await prisma.reserva.findUnique({
      where: { idReserva: Number(id) },
      include: {
        quadra: {
          include: {
            proprietario: true
          }
        }
      }
    });

    if (!reserva) {
      return res.status(404).json({ error: "Reserva não encontrada" });
    }

    if (reserva.clienteId !== clienteId) {
      return res.status(403).json({ error: "Sem permissão para cancelar esta reserva" });
    }

    await prisma.transacao.update({
      where: { idTransacao: reserva.transacaoId },
      data: { status: "cancelado" }
    });

    await prisma.reservaHorario.deleteMany({
      where: { reservaId: Number(id) }
    });

    await prisma.reserva.delete({
      where: { idReserva: Number(id) }
    });

    res.json({ message: "Reserva cancelada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao cancelar reserva" });
  }
};

export const excluirReservaPorQuadra = async (req: Request, res: Response) => {
  try {
    const { quadraId, reservaId } = req.params;
    const proprietarioId = req.id;

    const quadra = await prisma.quadra.findUnique({
      where: { idQuadra: Number(quadraId) },
      include: {
        proprietario: true
      }
    });

    if (!quadra) {
      return res.status(404).json({ error: "Quadra não encontrada" });
    }

    if (quadra.proprietarioId !== proprietarioId && req.isAdm) {
      return res.status(403).json({ error: "Sem permissão para excluir reservas desta quadra" });
    }

    const reserva = await prisma.reserva.findUnique({
      where: { idReserva: Number(reservaId) }
    });

    if (!reserva || reserva.quadraId !== Number(quadraId)) {
      return res.status(404).json({ error: "Reserva não encontrada" });
    }

    await prisma.transacao.update({
      where: { idTransacao: reserva.transacaoId },
      data: { status: "cancelado" }
    });

    await prisma.reservaHorario.deleteMany({
      where: { reservaId: Number(reservaId) }
    });

    await prisma.reserva.delete({
      where: { idReserva: Number(reservaId) }
    });

    res.json({ message: "Reserva excluída com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir reserva" });
  }
};

export const listarReservasCliente = async (req: Request, res: Response) => {
  try {
    const clienteId = req.id;

    const reservas = await prisma.reserva.findMany({
      where: { clienteId: Number(clienteId) },
      include: {
        quadra: true,
        horarios: true,
        cliente: true
      }
    });

    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar reservas do cliente" });
  }
};

export const listarReservasQuadra = async (req: Request, res: Response) => {
  try {
    const { quadraId, data } = req.params;

    const [year, month, day] = data.split('-').map(Number);
    const dataConsulta = new Date(year, month - 1, day);

    const reservas = await prisma.reserva.findMany({
      where: { 
        quadraId: Number(quadraId),
        horarios: {
          some: {
            dataInicio: {
              gte: new Date(dataConsulta.setHours(0, 0, 0, 0)),
              lte: new Date(dataConsulta.setHours(23, 59, 59, 999))
            }
          }
        }
      },
      include: {
        horarios: true
      }
    });

    const todosHorarios = Array.from({length: 24}, (_, i) => {
      const hora = i.toString().padStart(2, '0') + ':00';
      const horarioInicio = new Date(dataConsulta);
      horarioInicio.setHours(i, 0, 0, 0);

      // Check if this hour is booked
      const estaReservado = reservas.some(reserva => 
        reserva.horarios.some(horario => 
          horario.dataInicio.getTime() === horarioInicio.getTime()
        )
      );

      return {
        hora,
        disponivel: !estaReservado
      };
    });

    res.json({
      reservas,
      disponibilidade: todosHorarios
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar reservas da quadra" });
  }
};

export default router;