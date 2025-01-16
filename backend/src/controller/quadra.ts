import { Request, Response } from "express";
import prisma from "../db/prisma";

export const cadastrarQuadra = async (req: Request, res: Response) => {
  try {
    const { nomeQuadra, precoHora, cidade, estado, endereco } = req.body;

    const proprietarioId = req.id;

    const proprietario = await prisma.proprietario.findUnique({
      where: { idProprietario: proprietarioId },
    });

    if (!proprietario) {
      return res
        .status(400)
        .json({ error: "Não existe um proprietário para essa quadra!" });
    }

    const novaQuadra = await prisma.quadra.create({
      data: {
        nomeQuadra: nomeQuadra,
        precoHora: precoHora,
        cidade: cidade,
        estado: estado,
        endereco: endereco,
        proprietarioId: proprietarioId,
      },
    });

    console.log("Quadra cadastrada com sucesso:", novaQuadra);

    return res.status(201).send({
      message: "Quadra cadastrada com sucesso.",
      novaQuadra: novaQuadra,
    });
  } catch (error) {
    console.error("Erro ao cadastrar a quadra:", error);
    return res.status(500).json({ error: "Erro ao cadastrar a quadra." });
  }
};

export const excluirQuadra = async (req: Request, res: Response) => {
  try {
    const { idQuadra } = req.params;
    const proprietarioId = req.id;

    const quadra = await prisma.quadra.findUnique({
      where: { idQuadra: parseInt(idQuadra) },
    });

    if (!quadra) {
      return res.status(404).json({ error: "Quadra não encontrada." });
    }

    if (quadra.proprietarioId !== proprietarioId) {
      return res.status(403).json({ error: "Você não tem permissão para excluir essa quadra." });
    }

    const quadraExcluida = await prisma.quadra.delete({
      where: { idQuadra: parseInt(idQuadra) },
    });

    console.log("Quadra excluída com sucesso:", quadraExcluida);

    return res.status(200).send({
      message: "Quadra excluída com sucesso.",
      quadraExcluida: quadraExcluida,
    });

  } catch (error) {
    console.error("Erro ao excluir a quadra:", error);
    return res.status(500).json({ error: "Erro ao excluir a quadra." });
  }
};

export const editarQuadra = async (req: Request, res: Response) => {
  try {
    const { idQuadra } = req.params;
    const { nomeQuadra, precoHora, cidade, estado, endereco } = req.body;
    
    const proprietarioId = req.id;

    const quadra = await prisma.quadra.findUnique({
      where: { idQuadra: parseInt(idQuadra) },
    });

    if (!quadra) {
      return res.status(404).json({ error: "Quadra não encontrada." });
    }

    if (quadra.proprietarioId !== proprietarioId) {
      return res.status(403).json({ error: "Você não tem permissão para editar essa quadra." });
    }

    const updatedQuadra = await prisma.quadra.update({
      where: { idQuadra: parseInt(idQuadra) },
      data: {
        nomeQuadra: nomeQuadra || quadra.nomeQuadra,
        precoHora: precoHora || quadra.precoHora,
        cidade: cidade || quadra.cidade,
        estado: estado || quadra.estado,
        endereco: endereco || quadra.endereco,
      },
    });

    console.log("Quadra atualizada com sucesso:", updatedQuadra);

    return res.status(200).send({
      message: "Quadra atualizada com sucesso.",
      updatedQuadra: updatedQuadra,
    });
  } catch (error) {
    console.error("Erro ao editar a quadra:", error);
    return res.status(500).json({ error: "Erro ao editar a quadra." });
  }
};

export const verQuadra = async (req: Request, res: Response) => {
  try {
    const { idQuadra } = req.params;

    const quadra = await prisma.quadra.findUnique({
      where: { idQuadra: parseInt(idQuadra) },
    });

    if (!quadra) {
      return res.status(404).json({ error: "Quadra não encontrada." });
    }

    console.log("Detalhes da quadra:", quadra);

    return res.status(200).send({
      message: "Detalhes da quadra encontrados.",
      quadra: quadra,
    });
  } catch (error) {
    console.error("Erro ao buscar a quadra:", error);
    return res.status(500).json({ error: "Erro ao buscar a quadra." });
  }
};
