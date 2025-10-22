import { Request, Response, NextFunction } from "express";
// Importamos los tipos de Express para tipar correctamente las requests y responses
import * as usuarioService from "../services/usuarioService";
// Importamos los servicios relacionados con usuarios

// Controlador para obtener todos los usuarios
export const getUsuarios = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Llamamos al servicio que obtiene todos los usuarios
    const usuarios = await usuarioService.obtenerUsuarios();
    // Respondemos con los usuarios en formato JSON
    res.json(usuarios);
  } catch (error) {
    // Si ocurre un error, lo pasamos al middleware global de manejo de errores
    next(error);
  }
};

// Controlador para crear un nuevo usuario
export const postUsuario = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nombre, email } = req.body; // Obtenemos los datos del cuerpo de la request

    // Validación básica: verificamos que existan nombre y email
    if (!nombre || !email) return res.status(400).json({ error: "Faltan datos" });

    // Llamamos al servicio que crea el usuario
    const usuario = await usuarioService.crearUsuario(nombre, email);

    // Respondemos con el usuario creado y código HTTP 201 (creado)
    res.status(201).json(usuario);
  } catch (error) {
    // Si ocurre un error, lo pasamos al middleware global de manejo de errores
    next(error);
  }
};
