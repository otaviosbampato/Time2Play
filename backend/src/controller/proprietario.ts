import { Request, Response } from "express";
import prisma from "../model/prisma";
import bcryptjs from "bcryptjs";

export const registrarProprietario = async (req: Request, res: Response) => {
  try {
    const { email, nome, senha, cpfCnpj, cidade } = req.body;

    if (!email || !nome || !senha || !cpfCnpj || !cidade) {
      return res.status(400).send("Todos os campos devem ser preenchidos.");
    }

    const userByEmail = await prisma.proprietario.findUnique({
      where: { email },
    });

    const userByCpfCnpj = await prisma.proprietario.findUnique({
      where: { cpfCnpj },
    });

    if (userByEmail || userByCpfCnpj) {
      return res
        .status(400)
        .json({ error: "Usuário com esse e-mail já existe!" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(senha, salt);

    const proprietario = await prisma.proprietario.create({
      data: {
        email,
        nome,
        senha: hashedPassword,
        cpfCnpj,
        cidade
      },
    });

    if (!proprietario) {
      res.status(400).json({ error: "Dados de usuário inválidos" });
    }

    return res.status(201).send({
      message: "Proprietário cadastrado com sucesso.",
      proprietario: proprietario,
    });
  } catch (error: any) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log("Erro ao registrar cliente", error.message);
  }
};
