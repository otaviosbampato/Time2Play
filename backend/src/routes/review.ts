import express from "express";
import { realizarReview, cancelarReview } from "../controller/review.ts";

const router = express.Router();

router.post("/realizar", realizarReview);
router.post("/cancelar", cancelarReview);

export default router;