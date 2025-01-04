import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

interface JwtPayload {
  id: number;
  tipoConta: string;
  isAdm: boolean;
}

const generateToken = (params: JwtPayload): string => {
  return jwt.sign(params, JWT_SECRET, {
    expiresIn: 86400, // 24 horas
  });
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    const cliente = await prisma.cliente.findUnique({
      where: { email },
    });

    const proprietario = await prisma.proprietario.findUnique({
      where: { email },
    });

    if (!cliente && !proprietario) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    let conta = null;
    let tipoConta = "";

    if (cliente) {
      conta = cliente;
      tipoConta = "cliente";
    }
    
    if (proprietario) {
      conta = proprietario;
      tipoConta = "proprietario";
    }

    if (conta == null) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const senhaValida = await bcryptjs.compare(senha, conta.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const isAdm = !!proprietario;

    const token = generateToken({
      id: cliente ? cliente.idCliente : proprietario!.idProprietario,
      tipoConta,
      isAdm,
    });

    return res.status(200).json({
      message: "Login realizado com sucesso!",
      token,
      usuario: {
        id: cliente ? cliente.idCliente : proprietario!.idProprietario,
        nome: cliente ? cliente.nome : proprietario!.nome,
        email,
        tipoConta,
      },
    });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
};
