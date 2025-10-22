import { Request, Response, NextFunction } from "express";
import * as tareaService from "../services/tareaService";

// Obtener todas las tareas
export const getTareas = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tareas = await tareaService.obtenerTareas();
    res.json(tareas);
  } catch (error) {
    next(error);
  }
};

// Crear una tarea
export const postTarea = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { titulo, descripcion, usuarioId } = req.body;

    if (!titulo || !usuarioId) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const tarea = await tareaService.crearTarea({
      titulo,
      descripcion,
      usuarioId,
      completada: false, // valor por defecto
    });

    res.status(201).json(tarea);
  } catch (error) {
    next(error);
  }
};

// Actualizar tarea (marcar completada o editar)
export const patchTarea = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const tarea = await tareaService.actualizarTarea(Number(id), data);

    res.json(tarea);
  } catch (error) {
    next(error);
  }
};
