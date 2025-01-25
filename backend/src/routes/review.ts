import express from "express";
import { realizarReview, cancelarReview, listarReviewsPorQuadra, editarReview } from "../controller/review.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

const router = express.Router();

router.post("/realizar", authMiddleware, realizarReview);
router.delete("/cancelar/:idReview", authMiddleware, cancelarReview);
router.get("/visualizar/:quadraId", authMiddleware, listarReviewsPorQuadra);
router.put("/editar/:idReview", authMiddleware, editarReview);

export default router;