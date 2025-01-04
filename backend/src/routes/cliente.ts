import express from "express";
import { registrarCliente } from "../controller/cliente.ts";

const router = express.Router();

router.post("/registrar", registrarCliente);

export default router;