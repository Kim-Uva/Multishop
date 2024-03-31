const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const pedido = await prisma.pedido.findMany({
    include: {
      encabezadoCompra: true,
      estadoPedido: true,
    },
  });
  response.json(pedido);
};

module.exports.getById = async (request, response, next) => {
  let IdPedido = parseInt(request.params.id);
  const pedido = await prisma.pedido.findUnique({
    where: {
      id: IdPedido,
    },
    include: {
      encabezadoCompra: true,
      estadoPedido: true,
    },
  });
  response.json(pedido);
};

module.exports.create = async (request, response, next) => {
  let body = request.body;

  const nuevoPedido = await prisma.pedido.create({
    data: {
      idEncabezadoCompra: body.idEncabezadoCompra,
      idEstado: body.idEstado,
      observaciones: body.observaciones,
 
   
    },
  });

  response.json(nuevoPedido);
};
