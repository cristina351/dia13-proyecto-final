import { Router } from "express";
import { getUsuarios, postUsuario } from "../controllers/usuarioController";

const router = Router();
router.get("/", getUsuarios);
router.post("/", postUsuario);
export default router;
