const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const detalle = await prisma.detalleCompra.findMany({
    include: {
      encabezadoCompra: true,
    },
  });
  response.json(pedidos);
};

module.exports.create = async (request, response, next) => {
  let body = request.body;

  const nuevoDetalle = await prisma.detalleCompra.create({
    data: {
      idBodega: body.idBodega,
      idProducto: body.idProducto,
      cantidad: body.cantidad,
    
      
    },
  });
};
