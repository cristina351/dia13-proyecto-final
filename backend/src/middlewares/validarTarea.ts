import { z } from "zod"; 
// Importamos Zod para la validación de datos
import { Request, Response, NextFunction } from "express"; 
// Importamos tipos de Express

// Definimos el esquema de validación para un usuario
const schemaUsuario = z.object({
  nombre: z.string().min(3, "El nombre es obligatorio"), // Nombre obligatorio mínimo 3 caracteres
  email: z.string().email("Correo inválido"),           // Email debe ser válido
});

// Middleware para validar la información del usuario en la request
export const validarUsuario = (req: Request, res: Response, next: NextFunction) => {
  // Validamos los datos de la request según el esquema
  const result = schemaUsuario.safeParse(req.body);

  // Si la validación falla, respondemos con un 400 y los errores
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues });
  }

  // Si todo está bien, pasamos al siguiente middleware o controlador
  next();
};
