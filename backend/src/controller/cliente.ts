import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import prisma from "../model/prisma"

export const registrarCliente = async (req: Request, res: Response) => {
  try {
    const { email, nome, senha } = req.body;

    if (!email || !nome || !senha) {
      return res.status(400).send("Todos os campos devem ser preenchidos.");
    }

    const user = await prisma.cliente.findUnique({ where: { email } });

    if (user) {
      return res
        .status(400)
        .json({ error: "Usuário com esse e-mail já existe!" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(senha, salt);

    const cliente = await prisma.cliente.create({
      data: {
        email,
        nome,
        senha: hashedPassword,
      },
    });

    if (!cliente) {
      res.status(400).json({ error: "Dados de usuário inválidos" });
    }

    return res.status(201).send({
      message: "Cliente cadastrado com sucesso.",
      cliente: cliente,
    });
  } catch (error: any) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log("Erro ao registrar cliente", error.message);
  }
};