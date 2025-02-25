const prisma = require("../prisma/prisma");
const { transformWithSchema } = require("../utils/transform.data");
const { responseUserDto } = require("../dto/user/response.user.dto");

exports.getAllLivres = async () => {
  const livres = await prisma.livre.findMany({
    include: {
      User: true,
    },
  });
  return livres.map((livre) => ({
    ...livre,
    User: livre.User ? transformWithSchema(livre.User, responseUserDto) : null,
  }));
};

exports.getAllLivresWithPagination = async (page, limit) => {
  const livres = await prisma.livre.findMany({
    include: {
      User: {
        select: {
          id: true,
          name: true,
          first_name: true,
          cin: true,
        },
      },
    },
    skip: (page - 1) * limit,
    take: limit,
  });
  const totalLivres = await prisma.livre.count();
  return { livres, totalLivres };
};

exports.getLivreById = async (id) => {
  return await prisma.livre.findUnique({
    where: { id },
  });
};

exports.createLivre = async (data) => {
  return await prisma.livre.create({
    data,
  });
};

exports.updateLivreService = async (id, data) => {
  return await prisma.livre.update({
    where: { id },
    data,
  });
};
