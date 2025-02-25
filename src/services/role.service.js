const prisma = require("../prisma/prisma");
exports.getAll = async () => {
  return await prisma.role.findMany();
};

exports.getById = async (id) => {
  return await prisma.role.findUnique({ where: { id } });
};

exports.create = async (data) => {
  return await prisma.role.create({ data });
};
