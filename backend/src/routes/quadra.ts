import express from "express";
import { cadastrarQuadra, editarQuadra, excluirQuadra, verQuadra } from "../controller/quadra.ts";
import admMiddleware from "../middleware/admMiddleware.ts";
import authMiddleware from "../middleware/authMiddleware.ts"

const router = express.Router();

router.post("/cadastrar", [authMiddleware, admMiddleware], cadastrarQuadra);
router.delete("/excluir/:idQuadra", [authMiddleware, admMiddleware], excluirQuadra);
router.put("/editar/:idQuadra", [authMiddleware, admMiddleware], editarQuadra);
router.get("/verQuadra/:idQuadra", authMiddleware, verQuadra);

export default router;