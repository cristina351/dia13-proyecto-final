import express from "express"; // Importa Express, framework para crear el servidor
import cors from "cors"; // Importa CORS para permitir peticiones desde el frontend
import dotenv from "dotenv"; // Importa dotenv para manejar variables de entorno
import usuarioRoutes from "./routes/usuarioRoutes"; // Importa rutas de usuarios
import tareaRoutes from "./routes/tareaRoutes"; // Importa rutas de tareas
import { errorHandler } from "./middlewares/errorHandler"; // Importa middleware para manejo de errores

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Crea una instancia de Express
const app = express();

// Configura CORS para permitir solicitudes desde otros orígenes
app.use(cors());

// Permite recibir solicitudes con cuerpo en formato JSON
app.use(express.json());

// Endpoint raíz
app.get("/", (req, res) => {
  res.send("API funcionando correctamente 🚀");
});

// Define la ruta base para los endpoints de usuarios
app.use("/api/usuarios", usuarioRoutes);

// Define la ruta base para los endpoints de tareas
app.use("/api/tareas", tareaRoutes);

// Middleware global para manejar errores en toda la aplicación
app.use(errorHandler);

// Define el puerto en el que correrá el servidor (por variable de entorno o 3000 por defecto)
const PORT = process.env.PORT || 3000;

// Inicia el servidor y muestra un mensaje en consola
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
