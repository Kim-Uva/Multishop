const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//////////Detalle/////////
module.exports.getDetalle = async (request, response, next) => {
  const detalle = await prisma.detalleCompra.findMany({
    include: {
      producto: true,
    },
  });
  response.json(detalle);
}; 

module.exports.getDetalleById = async (request, response, next) => {
  let idDetalle = parseInt(request.params.id);
  const detalle = await prisma.detalleCompra.findUnique({
    where: {
      id: idDetalle,
    },
  });
  response.json(detalle);
};

module.exports.createDetalle = async (request, response, next) => {
  let body = request.body;

  
  // const calcPrecio = await prisma.producto.findUnique({
  //   where: {
  //     id: body.idProducto,
  //   },
  // });

  // let precioTotal = calcPrecio.precio * body.cantidad;

  const nuevoDetalle = await prisma.detalleCompra.create({
    data: {
      
      idProducto: body.idProducto, 
      cantidad: body.cantidad, 
      precio: body.precioTotal,
    },
  });
  response.json(nuevoDetalle);
};


//Actualizar
module.exports.updateDetalle = async (request, response, next) => {
  try {
      let detalle = request.body;
      let idDetalle = parseInt(request.params.id); 

      const encontDetalle = await prisma.detalleCompra.findUnique({
        where: {
          id: idDetalle,
        },
      });

      const calcPrecio = await prisma.producto.findUnique({
        where: {
          id: detalle.idProducto, 
        },
      });

      let precioTotal = calcPrecio.precio * encontDetalle.cantidad;

      const actualizarDetalle = await prisma.detalleCompra.update({
          where: {
              id: idDetalle,

          },

          data: {
            idProducto:detalle.producto,
            cantidad: detalle.cantidad,
            precio: precioTotal,
              
          },
          
      });

      response.json(actualizarDetalle);

  } catch (error) {
      console.error('Error al actualizar el detalle:', error);
      response.status(500).json({ error: 'Error interno del servidor' });
  }

};


//Eliminar detalle
module.exports.deleteDetalle = async (request, response, next) => {
  let idDetalle = parseInt(request.params.id);
  await prisma.detalleCompra.delete({
    where: {
      id: idDetalle,
    },
  });
  response.json({ message: 'Se eliminó el detalle de manera correcta' });
};





 