const prisma = require("../prisma/prisma");
const bcrypt = require("bcrypt");
const { transformWithSchema } = require("../utils/transform.data");
const { responseUserDto } = require("../dto/user/response.user.dto");

exports.getAllUserWithPagination = async (page, limit) => {
  const users = await prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
  const totalUsers = await prisma.user.count();
  return {
    users: users ? transformWithSchema(users, responseUserDto) : null,
    totalUsers,
  };
};

exports.getAllUsers = async () => {
  const users = await prisma.user.findMany({
    include: {
      role: true,
    },
  });
  return users ? transformWithSchema(users, responseUserDto) : null;
};

exports.getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      role: true,
    },
    // select: {
    //   id: true,
    //   role: true,
    //   name: true,
    //   first_name: true,
    //   cin: true,
    //   phone: true,
    // }
  });
  // return user;
  return user ? transformWithSchema(user, responseUserDto) : null;
};

exports.createUser = async (data) => {
  // const roleExists = await prisma.role.findUnique({
  //   where: { id: parseInt(data.roleId) },
  // });

  // if (!roleExists) {
  //   throw new Error("Le rôle spécifié n'existe pas");
  // }

  data.password = bcrypt.hashSync(data.password, 10);

  return await prisma.user.create({
    data,
  });
};

exports.updateUser = async (id, data) => {
  const user = await prisma.user.update({
    where: { id },
    data,
  });
  user;
  return user ? transformWithSchema(user, responseUserDto) : null;
};
