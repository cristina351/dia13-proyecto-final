"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// Importamos tipos de Express para tipado de request, response y next function
// Middleware global para manejar errores en la aplicación
const errorHandler = (err, // Error que ocurre en cualquier parte del servidor
req, // Objeto de la petición HTTP
res, // Objeto de la respuesta HTTP
next // Función para pasar al siguiente middleware (no se usa aquí)
) => {
    // Mostramos el error completo en la consola para depuración
    console.error("Error:", err);
    // Respondemos al cliente con un estado 500 (Error interno del servidor)
    // y un mensaje genérico de error
    res.status(500).json({ error: "Error interno del servidor" });
};
exports.errorHandler = errorHandler;
