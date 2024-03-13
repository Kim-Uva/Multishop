const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const subCategoria = await prisma.subCategoria.findMany({
  
  });
  response.json(subCategoria);
};

module.exports.getById = async (request, response, next) => {
  let subIdCategoria = parseInt(request.params.id);
  const subCategoria = await prisma.subCategoria.findUnique({
    where: {
      id: subIdCategoria,
    },

  });
  response.json(subCategoria);
};