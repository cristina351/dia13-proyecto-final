"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarUsuario = void 0;
const zod_1 = require("zod");
// Importamos tipos de Express
// Definimos el esquema de validación para un usuario
const schemaUsuario = zod_1.z.object({
    nombre: zod_1.z.string().min(3, "El nombre es obligatorio"), // Nombre obligatorio mínimo 3 caracteres
    email: zod_1.z.string().email("Correo inválido"), // Email debe ser válido
});
// Middleware para validar la información del usuario en la request
const validarUsuario = (req, res, next) => {
    // Validamos los datos de la request según el esquema
    const result = schemaUsuario.safeParse(req.body);
    // Si la validación falla, respondemos con un 400 y los errores
    if (!result.success) {
        return res.status(400).json({ error: result.error.issues });
    }
    // Si todo está bien, pasamos al siguiente middleware o controlador
    next();
};
exports.validarUsuario = validarUsuario;
