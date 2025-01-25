import express from "express";

import {
  realizarReserva,
  cancelarReserva,
  excluirReservaPorQuadra,
  listarReservasCliente,
  listarReservasQuadra,
} from "../controller/reserva.ts";

import admMiddleware from "../middleware/admMiddleware.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

const router = express.Router();

router.post("/cadastrar", authMiddleware, realizarReserva);
router.delete("/cancelar/:id", authMiddleware, cancelarReserva);
router.delete("/excluir/:quadraId/:reservaId", [authMiddleware, admMiddleware], excluirReservaPorQuadra);
router.get("/cliente", authMiddleware, listarReservasCliente);
router.get("/quadra/:quadraId/:data", authMiddleware, listarReservasQuadra);

export default router;