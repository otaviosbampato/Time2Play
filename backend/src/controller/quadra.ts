import { Request, Response } from "express";
import prisma from "../db/prisma";

export const cadastrarQuadra = async (req: Request, res: Response) => {
  try {
    const { nomeQuadra, precoHora, cidade, estado, endereco, proprietarioId } = req.body;

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
  } 
};
