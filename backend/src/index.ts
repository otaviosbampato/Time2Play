import express, { Request, Response, RequestHandler } from "express";
import dotenv from "dotenv";

import clienteRoutes from "./routes/cliente";
import proprietarioRoutes from "./routes/proprietario";
import quadraRoutes from "./routes/quadra";
import reviewRoutes from "./routes/review"
import authRoutes from "./routes/auth"

dotenv.config();

const PORT = 3000;
const app = express();

app.use(express.json());
app.use("/cliente", clienteRoutes);
app.use("/proprietario", proprietarioRoutes);
app.use("/quadra", quadraRoutes);
app.use("/review", reviewRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`servidor na porta ${PORT}`);
});