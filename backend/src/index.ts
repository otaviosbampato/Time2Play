import express, { Request, Response, RequestHandler } from "express";
import dotenv from "dotenv";

import clienteRoutes from "./routes/cliente";
import proprietarioRoutes from "./routes/proprietario";
import quadraRoutes from "./routes/quadra";
import reviewRoutes from "./routes/review"
import authRoutes from "./routes/auth"
import reservaRoutes from "./routes/reserva";
import cors from "cors";

dotenv.config();

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/cliente", clienteRoutes);
app.use("/proprietario", proprietarioRoutes);
app.use("/quadra", quadraRoutes);
app.use("/reserva", reservaRoutes);
app.use("/review", reviewRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`servidor na porta ${PORT}`);
});

export default app;