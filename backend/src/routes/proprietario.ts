import express from "express";
import { registrarProprietario } from "../controller/proprietario.ts";

const router = express.Router();

router.post("/registrar", registrarProprietario);

export default router;