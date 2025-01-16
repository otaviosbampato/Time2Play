import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

interface JwtPayload {
  id: number;
  tipoConta: string;
  isAdm: boolean;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Token não fornecido ou inválido." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verify(token, JWT_SECRET) as JwtPayload;

    req.isAdm = decoded.isAdm;
    req.tipoConta = decoded.tipoConta;
    req.id = decoded.id;

    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido ou expirado." });
  }
};
