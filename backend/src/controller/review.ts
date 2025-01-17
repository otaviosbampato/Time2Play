import { Request, Response } from "express";
import prisma from "../db/prisma";

export const realizarReview = async (req: Request, res: Response) => {
  try {
    const { nota, titulo, comentario, quadraId } = req.body;
    const clienteId = req.id;

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


export const cancelarReview = async (req: Request, res: Response) => {
  try {
    const idCliente = req.id; 
    const { idReview } = req.params;

    if (!idCliente) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    const review = await prisma.review.findUnique({
      where: { idReview: Number(idReview) },
    });

    if (!review) {
      return res.status(404).json({ error: "Review não encontrada." });
    }

    if (review.clienteId !== Number(idCliente)) {
      return res.status(403).json({ error: "Você não tem permissão para deletar esta review." });
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

export const listarReviewsPorQuadra = async (req: Request, res: Response) => {
  try {
    const { quadraId } = req.params;

    if (!quadraId) {
      return res.status(400).json({ error: "O ID da quadra é obrigatório." });
    }

    const quadra = await prisma.quadra.findUnique({
      where: { idQuadra: Number(quadraId) },
    });

    if (!quadra) {
      return res.status(404).json({ error: "Quadra não encontrada." });
    }

    const reviews = await prisma.review.findMany({
      where: { quadraId: Number(quadraId) },
    });

    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhuma review encontrada para esta quadra." });
    }

    const somaNotas = reviews.reduce((soma, review) => soma + review.nota, 0);
    const mediaNotas = somaNotas / reviews.length;

    return res.status(200).json({
      message: "Reviews encontradas com sucesso!",
      reviews,
      media: mediaNotas.toFixed(2),
    });

  } catch (error) {
    console.error("Erro ao listar as reviews da quadra:", error);
    return res
      .status(500)
      .json({ error: "Erro interno ao listar as reviews da quadra." });
  }
};


export const editarReview = async (req: Request, res: Response) => {
  try {
    const idCliente = req.id;
    const { idReview } = req.params; 
    const { nota, titulo, comentario } = req.body;

    if (!idCliente) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    if (!nota || !titulo || !comentario) {
      return res
        .status(400)
        .json({ error: "Todos os campos (nota, título, comentário) são obrigatórios." });
    }

    if (nota < 0 || nota > 5) {
      return res.status(400).json({ error: "A nota deve estar entre 0 e 5." });
    }

    const review = await prisma.review.findUnique({
      where: { idReview: Number(idReview) },
    });

    if (!review) {
      return res.status(404).json({ error: "Review não encontrada." });
    }

    if (review.clienteId !== Number(idCliente)) {
      return res
        .status(403)
        .json({ error: "Você não tem permissão para editar esta review." });
    }

    const reviewAtualizada = await prisma.review.update({
      where: { idReview: Number(idReview) },
      data: {
        nota,
        titulo,
        comentario,
      },
    });

    return res.status(200).json({
      message: "Review atualizada com sucesso!",
      review: reviewAtualizada,
    });
  } catch (error) {
    console.error("Erro ao editar a review:", error);
    return res.status(500).json({ error: "Erro interno ao editar a review." });
  }
};