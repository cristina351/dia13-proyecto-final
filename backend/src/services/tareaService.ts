import { prisma } from "../db/prisma";

export const obtenerTareas = () => {
  return prisma.tarea.findMany({ include: { usuario: true } });
};

export const crearTarea = (data: {
  titulo: string;
  descripcion?: string;
  usuarioId: number;
  completada?: boolean;
}) => {
  return prisma.tarea.create({
    data: {
      titulo: data.titulo,
      descripcion: data.descripcion || "",
      usuarioId: data.usuarioId,
      completada: data.completada ?? false,
    },
    include: { usuario: true },
  });
};

export const actualizarTarea = (
  id: number,
  data: { titulo?: string; descripcion?: string; completada?: boolean }
) => {
  return prisma.tarea.update({
    where: { id },
    data,
    include: { usuario: true },
  });
};
