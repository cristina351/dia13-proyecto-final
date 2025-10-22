"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarTarea = void 0;
const zod_1 = require("zod");
// Importamos tipos de Express
// Definimos el esquema de validación para una tarea
const schemaTarea = zod_1.z.object({
    titulo: zod_1.z.string().min(3, "El título es obligatorio"), // El título debe tener al menos 3 caracteres
    descripcion: zod_1.z.string().optional(), // La descripción es opcional
    completada: zod_1.z.boolean().optional(), // El estado completada es opcional
    usuarioId: zod_1.z.number(), // El ID del usuario es obligatorio
});
// Middleware para validar la información de la tarea en la request
const validarTarea = (req, res, next) => {
    // Validamos los datos de la request según el esquema
    const result = schemaTarea.safeParse(req.body);
    // Si la validación falla, respondemos con un 400 y los errores
    if (!result.success) {
        return res.status(400).json({ error: result.error.issues });
    }
    // Si todo está correcto, pasamos al siguiente middleware o controlador
    next();
};
exports.validarTarea = validarTarea;
