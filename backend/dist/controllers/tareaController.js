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
exports.patchTarea = exports.postTarea = exports.getTareas = void 0;
const tareaService = __importStar(require("../services/tareaService"));
// Obtener todas las tareas
const getTareas = async (req, res, next) => {
    try {
        const tareas = await tareaService.obtenerTareas();
        res.json(tareas);
    }
    catch (error) {
        next(error);
    }
};
exports.getTareas = getTareas;
// Crear una tarea
const postTarea = async (req, res, next) => {
    try {
        const { titulo, descripcion, usuarioId } = req.body;
        if (!titulo || !usuarioId) {
            return res.status(400).json({ error: "Faltan datos" });
        }
        const tarea = await tareaService.crearTarea({
            titulo,
            descripcion,
            usuarioId,
            completada: false, // valor por defecto
        });
        res.status(201).json(tarea);
    }
    catch (error) {
        next(error);
    }
};
exports.postTarea = postTarea;
// Actualizar tarea (marcar completada o editar)
const patchTarea = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const tarea = await tareaService.actualizarTarea(Number(id), data);
        res.json(tarea);
    }
    catch (error) {
        next(error);
    }
};
exports.patchTarea = patchTarea;
