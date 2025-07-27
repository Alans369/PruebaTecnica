// Archivo de utilidad para inicializar y exportar Prisma Client
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

module.exports = prisma;
