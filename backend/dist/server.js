"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Importa Express, framework para crear el servidor
const cors_1 = __importDefault(require("cors")); // Importa CORS para permitir peticiones desde el frontend
const dotenv_1 = __importDefault(require("dotenv")); // Importa dotenv para manejar variables de entorno
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes")); // Importa rutas de usuarios
const tareaRoutes_1 = __importDefault(require("./routes/tareaRoutes")); // Importa rutas de tareas
const errorHandler_1 = require("./middlewares/errorHandler"); // Importa middleware para manejo de errores
// Carga las variables de entorno desde el archivo .env
dotenv_1.default.config();
// Crea una instancia de Express
const app = (0, express_1.default)();
// Configura CORS para permitir solicitudes desde otros orígenes
app.use((0, cors_1.default)());
// Permite recibir solicitudes con cuerpo en formato JSON
app.use(express_1.default.json());
// Endpoint raíz
app.get("/", (req, res) => {
    res.send("API funcionando correctamente 🚀");
});
// Define la ruta base para los endpoints de usuarios
app.use("/api/usuarios", usuarioRoutes_1.default);
// Define la ruta base para los endpoints de tareas
app.use("/api/tareas", tareaRoutes_1.default);
// Middleware global para manejar errores en toda la aplicación
app.use(errorHandler_1.errorHandler);
// Define el puerto en el que correrá el servidor (por variable de entorno o 3000 por defecto)
const PORT = process.env.PORT || 3000;
// Inicia el servidor y muestra un mensaje en consola
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
