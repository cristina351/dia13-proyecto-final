import { z } from "zod";
// Importamos Zod para validación de datos
import { Request, Response, NextFunction } from "express";
// Importamos tipos de Express

// Definimos el esquema de validación para una tarea
const schemaTarea = z.object({
  titulo: z.string().min(3, "El título es obligatorio"), // El título debe tener al menos 3 caracteres
  descripcion: z.string().optional(),                     // La descripción es opcional
  completada: z.boolean().optional(),                     // El estado completada es opcional
  usuarioId: z.number(),                                  // El ID del usuario es obligatorio
});

// Middleware para validar la información de la tarea en la request
export const validarTarea = (req: Request, res: Response, next: NextFunction) => {
  // Validamos los datos de la request según el esquema
  const result = schemaTarea.safeParse(req.body);

  // Si la validación falla, respondemos con un 400 y los errores
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues });
  }

  // Si todo está correcto, pasamos al siguiente middleware o controlador
  next();
};
