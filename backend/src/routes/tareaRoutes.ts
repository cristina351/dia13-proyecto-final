import { Router } from "express";
import { getTareas, postTarea, patchTarea } from "../controllers/tareaController";

const router = Router();

router.get("/", getTareas);       // GET /api/tareas
router.post("/", postTarea);      // POST /api/tareas
router.patch("/:id", patchTarea); // PATCH /api/tareas/:id

export default router;
