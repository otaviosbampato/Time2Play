import express from "express";
import { registrar } from "../controller/cliente.controller.ts";

const router = express.Router();

router.post("/registrar", registrar);

export default router;