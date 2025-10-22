"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarTarea = exports.crearTarea = exports.obtenerTareas = void 0;
const prisma_1 = require("../db/prisma");
const obtenerTareas = () => {
    return prisma_1.prisma.tarea.findMany({ include: { usuario: true } });
};
exports.obtenerTareas = obtenerTareas;
const crearTarea = (data) => {
    return prisma_1.prisma.tarea.create({
        data: {
            titulo: data.titulo,
            descripcion: data.descripcion || "",
            usuarioId: data.usuarioId,
            completada: data.completada ?? false,
        },
        include: { usuario: true },
    });
};
exports.crearTarea = crearTarea;
const actualizarTarea = (id, data) => {
    return prisma_1.prisma.tarea.update({
        where: { id },
        data,
        include: { usuario: true },
    });
};
exports.actualizarTarea = actualizarTarea;
