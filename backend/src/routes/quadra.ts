import express from "express";
import { cadastrarQuadra, editarQuadra, excluirQuadra, verQuadra, atualizarImagensDaQuadra } from "../controller/quadra.ts";
import admMiddleware from "../middleware/admMiddleware.ts";
import authMiddleware from "../middleware/authMiddleware.ts"

import upload from '../middleware/multer.ts';

const router = express.Router();

router.post("/cadastrar", [authMiddleware, admMiddleware], cadastrarQuadra);
router.delete("/excluir/:idQuadra", [authMiddleware, admMiddleware], excluirQuadra);
router.put("/editar/:idQuadra", [authMiddleware, admMiddleware], editarQuadra);
router.put("/atualizarQuadra/:quadraId", [authMiddleware, admMiddleware, upload.array('images')], atualizarImagensDaQuadra);

router.get("/verQuadra/:idQuadra", authMiddleware, verQuadra);

export default router;