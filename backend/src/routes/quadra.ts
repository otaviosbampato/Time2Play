import express from "express";
import { cadastrarQuadra } from "../controller/quadra.ts";

const router = express.Router();

router.post("/cadastrar", cadastrarQuadra);

export default router;