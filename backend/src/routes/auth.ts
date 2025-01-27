import express from "express";
import { login, esqueceuSenha, recuperarSenha, verificarToken, validarCodigo } from "../controller/auth.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

const router = express.Router();

router.post("/login", login);
router.post("/esqueceuSenha", esqueceuSenha);
router.post("/recuperarSenha", recuperarSenha);
router.post("/token", authMiddleware, verificarToken);
router.post("/validarCodigo", validarCodigo);

export default router;