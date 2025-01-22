import { Request, Response } from "express";
import prisma from "../model/prisma";
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

import { uploadOnCloudinary, cloudinary } from "../services/cloudinary";

interface MulterRequest extends Request {
  files: any;
}

export const cadastrarQuadra = async (req: Request, res: Response) => {
  try {
    const { nomeQuadra, precoHora, endereco, esporte } = req.body;

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
        endereco: endereco,
        esporte: esporte,
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
    const { nomeQuadra, precoHora, endereco, esporte } = req.body;
    
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
        endereco: endereco || quadra.endereco,
        esporte: esporte || quadra.esporte,
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

export const minhasQuadras = async (req: Request, res: Response) => {
  try {
    const idProprietario = req.id;

    const { nome, endereco, esporte } = req.params;

    const where: any = {};

    if (nome && nome !== 'all') {
      where.nomeQuadra = { contains: String(nome), mode: "insensitive" };
    }

    if (endereco && endereco !== 'all') {
      where.endereco = { contains: String(endereco), mode: "insensitive" };
    }

    if (esporte && esporte !== 'all') {
      where.esporte = { contains: String(esporte), mode: "insensitive" };
    }

    where.proprietarioId = idProprietario
      
    const quadras = await prisma.quadra.findMany({ where });

    if (!quadras) {
      return res.status(404).json({ error: "Quadra não encontrada." });
    }

    console.log("Detalhes da quadra:", quadras);

    res.status(200).json(quadras);
  } catch (error) {
    console.error("Erro ao buscar a quadra:", error);
    return res.status(500).json({ error: "Erro ao buscar a quadra." });
  }
};

export const atualizarImagensDaQuadra = async (req: Request, res: Response) => {
  const isAdm = req.isAdm;
  const idProprietario = req.id; 
  const files = (req as MulterRequest).files;

  if (!files || files.length === 0 || files.length > 10) {
    return res.status(400).json({
      success: false,
      message: "Envie uma quantidade válida de arquivos (1 a 10 imagens).",
    });
  }

  if (!isAdm) {
    return res.status(403).json({
      success: false,
      message: "Apenas administradores podem atualizar imagens de quadras.",
    });
  }

  let imagensAntigas: { url: string; publicId: string }[] = [];

  try {
    const quadra = await prisma.quadra.findUnique({
      where: { idQuadra: Number(req.params.quadraId) },
    });

    if (!quadra) {
      return res.status(404).json({
        success: false,
        message: "Quadra não encontrada.",
      });
    }

    if (quadra.proprietarioId !== idProprietario) {
      return res.status(403).json({
        success: false,
        message: "Você não tem permissão para alterar imagens desta quadra.",
      });
    }

    if (quadra.fotos) {
      imagensAntigas = quadra.fotos as { url: string; publicId: string }[];
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erro ao buscar informações da quadra.",
    });
  }

  let imagensNovas: { url: string; publicId: string }[] = [];

  try {
    for (const file of files) {
      const resultado = await uploadOnCloudinary(file.path, "quadra");

      if (!resultado) {
        return res.status(500).json({
          success: false,
          message: "Erro ao fazer upload para o Cloudinary.",
        });
      }

      imagensNovas.push({
        url: resultado.url,
        publicId: resultado.public_id,
      });
    }

    const quadraAtualizada = await prisma.quadra.update({
      where: { idQuadra: Number(req.params.quadraId) },
      data: {
        fotos: imagensNovas,
      },
    });

    for (const imagem of imagensAntigas) {
      const resultado = await cloudinary.uploader.destroy(imagem.publicId)
      console.log(resultado)
      console.log("Imagem excluida com sucesso");
    }

    return res.status(200).json({
      success: true,
      imagensDaQuadra: quadraAtualizada.fotos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar imagens da quadra.",
    });
  }
};

export const pesquisarQuadras = async (req: Request, res: Response) => {
  try {
    const { nome, endereco, esporte } = req.params;

    const where: any = {};

    if (nome && nome !== 'all') {
      where.nomeQuadra = { contains: String(nome), mode: "insensitive" };
    }

    if (endereco && endereco !== 'all') {
      where.endereco = { contains: String(endereco), mode: "insensitive" };
    }

    if (esporte && esporte !== 'all') {
      where.esporte = { contains: String(esporte), mode: "insensitive" };
    }
      
    const quadras = await prisma.quadra.findMany({ where });

    res.status(200).json(quadras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao pesquisar quadras.", detalhes: error });
  }
};