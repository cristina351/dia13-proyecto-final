"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUsuario = exports.getUsuarios = void 0;
// Importamos los tipos de Express para tipar correctamente las requests y responses
const usuarioService = __importStar(require("../services/usuarioService"));
// Importamos los servicios relacionados con usuarios
// Controlador para obtener todos los usuarios
const getUsuarios = async (req, res, next) => {
    try {
        // Llamamos al servicio que obtiene todos los usuarios
        const usuarios = await usuarioService.obtenerUsuarios();
        // Respondemos con los usuarios en formato JSON
        res.json(usuarios);
    }
    catch (error) {
        // Si ocurre un error, lo pasamos al middleware global de manejo de errores
        next(error);
    }
};
exports.getUsuarios = getUsuarios;
// Controlador para crear un nuevo usuario
const postUsuario = async (req, res, next) => {
    try {
        const { nombre, email } = req.body; // Obtenemos los datos del cuerpo de la request
        // Validación básica: verificamos que existan nombre y email
        if (!nombre || !email)
            return res.status(400).json({ error: "Faltan datos" });
        // Llamamos al servicio que crea el usuario
        const usuario = await usuarioService.crearUsuario(nombre, email);
        // Respondemos con el usuario creado y código HTTP 201 (creado)
        res.status(201).json(usuario);
    }
    catch (error) {
        // Si ocurre un error, lo pasamos al middleware global de manejo de errores
        next(error);
    }
};
exports.postUsuario = postUsuario;
