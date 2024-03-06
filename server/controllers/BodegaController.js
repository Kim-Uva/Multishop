const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const bodegas = await prisma.bodega.findMany({
      orderBy: {
        nombre: "asc",
      },
    });
    response.json(bodegas);
  };