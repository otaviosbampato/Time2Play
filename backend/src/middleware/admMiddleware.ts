import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      id: number;
      tipoConta: string;
      isAdm: boolean;
    }
  }
}

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAdm) {
    return res
      .status(403)
      .json({
        message: "Acesso negado. Somente administradores podem acessar",
      });
  }

  next();
};