const prisma = require('../prisma/prismaClient');

// Crear un nuevo rol
exports.create = async (name) => {
  return await prisma.role.create({ data: { name } });
};

// Obtener todos los roles
exports.readAll = async () => {
  return await prisma.role.findMany();
};

// Obtener un rol por ID
exports.readById = async (id) => {
  return await prisma.role.findUnique({ where: { id: Number(id) } });
};

// Actualizar un rol
exports.update = async (id, name) => {
  return await prisma.role.update({ where: { id: Number(id) }, data: { name } });
};

// Eliminar un rol
exports.delete = async (id) => {
  const deleted = await prisma.role.delete({ where: { id: Number(id) } });
  return !!deleted;
};
