import express, { Request, Response, RequestHandler } from "express";
import dotenv from "dotenv";

import userRoutes from "./routes/cliente.route";

dotenv.config();

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`servidor na porta ${PORT}`);
});