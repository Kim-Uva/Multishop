const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


module.exports.get = async (request, response, next) => {
    const proveedores = await prisma.proveedor.findMany({
      orderBy: {
        nombreProveedor: "asc",
      },
    });
    response.json(proveedores);
  };

  module.exports.getById = async (request, response, next) => {
    let idProveedor = parseInt(request.params.id);
    const proveedores = await prisma.proveedor.findUnique({
      where: {
        id: idProveedor,
      },
    });
    response.json(proveedores);
  };

  module.exports.create = async (request, response, next) => {
    let body = request.body;
}  