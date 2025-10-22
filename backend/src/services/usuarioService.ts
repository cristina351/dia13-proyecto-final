import { prisma } from "../db/prisma";

export const obtenerUsuarios = () => prisma.usuario.findMany();

export const crearUsuario = (nombre: string, email: string) => {
  return prisma.usuario.create({ data: { nombre, email } });
};
