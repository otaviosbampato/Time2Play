import { Request, Response } from "express";
import prisma from "../db/prisma";

export const realizarReview = async (req: Request, res: Response) => {
  try {
    const { nota, titulo, comentario, quadraId, clienteId } = req.body;

    if (!nota || nota < 0 || nota > 5) {
      return res.status(400).json({ error: "A nota deve estar entre 0 e 5." });
    }

    if (!titulo || !comentario || !quadraId || !clienteId) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    const quadra = await prisma.quadra.findUnique({
      where: { idQuadra: quadraId },
    });

    if (!quadra) {
      return res.status(404).json({ error: "Quadra não encontrada." });
    }

    const cliente = await prisma.cliente.findUnique({
      where: { idCliente: clienteId },
    });

    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }

    const novaReview = await prisma.review.create({
      data: {
        nota,
        titulo,
        comentario,
        quadraId,
        clienteId,
      },
    });

    return res.status(201).json({
      message: "Review criada com sucesso!",
      review: novaReview,
    });
  } catch (error) {
    console.error("Erro ao criar a review:", error);
    return res.status(500).json({ error: "Erro interno ao criar a review." });
  }
};


// !!! verificar se o id do token jwt é igual ao id fornecido
export const cancelarReview = async (req: Request, res: Response) => {
  try {
    const { idReview } = req.params;

    const review = await prisma.review.findUnique({
      where: { idReview: Number(idReview) },
    });

    if (!review) {
      return res.status(404).json({ error: "Review não encontrada." });
    }

    await prisma.review.delete({
      where: { idReview: Number(idReview) },
    });

    return res.status(200).json({ message: "Review deletada com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar a review:", error);
    return res.status(500).json({ error: "Erro interno ao deletar a review." });
  }
};
