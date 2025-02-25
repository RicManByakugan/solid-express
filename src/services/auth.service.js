const prisma = require("../prisma/prisma");

exports.findUserByUserName = async (phone) => {
  return prisma.user.findUnique({
    where: { phone },
  });
};
