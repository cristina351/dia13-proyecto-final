"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearUsuario = exports.obtenerUsuarios = void 0;
const prisma_1 = require("../db/prisma");
const obtenerUsuarios = () => prisma_1.prisma.usuario.findMany();
exports.obtenerUsuarios = obtenerUsuarios;
const crearUsuario = (nombre, email) => {
    return prisma_1.prisma.usuario.create({ data: { nombre, email } });
};
exports.crearUsuario = crearUsuario;
