import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma";

import { verifyUserEmail } from "../services/mail";

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

function generateCode(length: number): string {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

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

export const esqueceuSenha = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const cliente = await prisma.cliente.findUnique({ where: { email } });
    const proprietario = await prisma.proprietario.findUnique({
      where: { email },
    });

    if (!cliente && !proprietario) {
      console.error("Usuário não encontrado");
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    let conta = cliente || proprietario;
    let tipoConta = cliente ? "cliente" : "proprietario";

    const token = generateCode(6);
    const expiration = new Date();
    expiration.setHours(new Date().getHours() + 3);

    if (cliente) {
      await prisma.cliente.update({
        where: { idCliente: cliente.idCliente },
        data: {
          passwordResetToken: token,
          passwordResetTokenExpiration: expiration,
        },
      });
    } else {
      await prisma.proprietario.update({
        where: { idProprietario: proprietario!.idProprietario },
        data: {
          passwordResetToken: token,
          passwordResetTokenExpiration: expiration,
        },
      });
    }

    await verifyUserEmail({
      email,
      token,
      nome: conta!.nome,
    });

    res.json({ message: "Email enviado com sucesso" });
  } catch (err) {
    console.error("Erro ao processar solicitação:", err);
    res.status(500).json({ error: "Erro ao processar solicitação" });
  }
};

export const verificarToken = async (req: Request, res: Response) => {
  const { email } = req.body;
  const isAdm = req.isAdm;

  try {
    const cliente = await prisma.cliente.findUnique({
      where: { email },
    });

    const proprietario = await prisma.proprietario.findUnique({
      where: { email },
    });

    if (!cliente && !proprietario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const conta = cliente || proprietario;
   
    res.json({ conta, isAdm: isAdm} );
  } catch (err) {
    console.error("Erro ao verificar token:", err);
    res.status(500).json({ error: "Erro ao verificar token" });
  }
};

export const recuperarSenha = async (req: Request, res: Response) => {
  const { email, token, newPassword } = req.body;

  try {
    const cliente = await prisma.cliente.findUnique({
      where: { email },
      select: {
        idCliente: true,
        passwordResetToken: true,
        passwordResetTokenExpiration: true,
      },
    });

    const proprietario = await prisma.proprietario.findUnique({
      where: { email },
      select: {
        idProprietario: true,
        passwordResetToken: true,
        passwordResetTokenExpiration: true,
      },
    });

    if (!cliente && !proprietario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const conta = cliente || proprietario;

    if (
      token !== conta!.passwordResetToken ||
      new Date() > (conta!.passwordResetTokenExpiration as Date)
    ) {
      return res.status(400).json({ error: "Token inválido ou expirado" });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    if (cliente) {
      await prisma.cliente.update({
        where: { idCliente: cliente.idCliente },
        data: {
          senha: hashedPassword,
          passwordResetToken: null,
          passwordResetTokenExpiration: null,
        },
      });
    } else {
      await prisma.proprietario.update({
        where: { idProprietario: proprietario!.idProprietario },
        data: {
          senha: hashedPassword,
          passwordResetToken: null,
          passwordResetTokenExpiration: null,
        },
      });
    }

    res.json({ message: "Senha atualizada com sucesso" });
  } catch (err) {
    console.error("Erro ao atualizar senha:", err);
    res.status(500).json({ error: "Erro ao atualizar senha" });
  }
};
