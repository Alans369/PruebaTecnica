

const prisma = require('../prisma/prismaClient');

// Crear un nuevo usuario
exports.create = async (roleid, name, email, password) => {
  return await prisma.user.create({
    data: {
      role_id: Number(roleid),
      name,
      email,
      password
    },
    include: {
      role: true // Incluye los datos del rol en la respuesta
    }
  });
};

// Obtener todos los usuarios
exports.readAll = async () => {
  return await prisma.user.findMany({
    include: {
      role: true // Incluye los datos del rol de cada usuario
    }
  });
};

// Obtener un usuario por ID
exports.readById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      role: true // Incluye los datos del rol del usuario
    }
  });
};

// Actualizar un usuario
exports.update = async (id, roleid, name, email, password) => {
  return await prisma.user.update({
    where: {
      id: Number(id)
    },
    data: {
      role_id: Number(roleid),
      name,
      email,
      password
    },
    include: {
      role: true // Incluye los datos del rol en la respuesta
    }
  });
};

// Eliminar un usuario
exports.delete = async (id) => {
  const deleted = await prisma.user.delete({
    where: {
      id: Number(id)
    }
  });
  return !!deleted;
};

exports.findByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email: email
    }
  });
};