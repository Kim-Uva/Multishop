const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const categoria = await prisma.categoria.findMany({
 
  });
  response.json(categoria); 
};

module.exports.getById = async (request, response, next) => {
  let IdCategoria = parseInt(request.params.id);
  const categoria = await prisma.categoria.findUnique({
    where: {
      id: IdCategoria,
    },

  });
  response.json(categoria);  
};