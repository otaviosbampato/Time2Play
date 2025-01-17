import express from "express";
import { login, esqueceuSenha, recuperarSenha, verificarToken } from "../controller/auth.ts";

const router = express.Router();

router.post("/login", login);
router.post("/esqueceuSenha", esqueceuSenha);
router.post("/recuperarSenha", recuperarSenha);

export default router;