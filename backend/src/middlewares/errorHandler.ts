import { Request, Response, NextFunction } from "express"; 
// Importamos tipos de Express para tipado de request, response y next function

// Middleware global para manejar errores en la aplicación
export const errorHandler = (
  err: any,          // Error que ocurre en cualquier parte del servidor
  req: Request,      // Objeto de la petición HTTP
  res: Response,     // Objeto de la respuesta HTTP
  next: NextFunction // Función para pasar al siguiente middleware (no se usa aquí)
) => {
  // Mostramos el error completo en la consola para depuración
  console.error("Error:", err);

  // Respondemos al cliente con un estado 500 (Error interno del servidor)
  // y un mensaje genérico de error
  res.status(500).json({ error: "Error interno del servidor" });
};

