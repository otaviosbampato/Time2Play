import express from "express";
import { login } from "../controller/auth.ts";

const router = express.Router();

router.post("/login", login);

export default router;