const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

////////////Encabezado/////////////
module.exports.getEncabezado = async (request, response, next) => {
    const encabezado = await prisma.encabezadoCompra.findMany({
      include: {
        detalleCompra: true,
        proveedor: true
      },

    });
    response.json(encabezado);
  };
  
  
  module.exports.getEncabezadoById = async (request, response, next) => {
    let idEncabezado = parseInt(request.params.id);
    const encabezado = await prisma.encabezadoCompra.findUnique({
      where: {
        id: idEncabezado,
      },
      include:{
        detalleCompra: true,
        proveedor: true

      }
    });
    response.json(encabezado);
  };
  
  


  module.exports.createEncabezado = async (request, response, next) => {
    let body = request.body;

  
    const nuevoEncabezado  = await prisma.encabezadoCompra.create({
      data: {
        idUsuario: body.idUsuario,
        idProveedor: body.idProveedor, 
        idBodega: body.idBodega,
  
        
        detalleCompra:{
          connect: body.detalleCompra,
          
        },

      },
    }); 


    const encabezadoCompraId = nuevoEncabezado.id;

    // Actualizar el encabezadoCompra de cada detalle de compra
    for (const detalle of body.detalleCompra) {
        await prisma.detalleCompra.update({
            where: { 
                id: detalle.id 
            },
            data: { 
                idEncabezadoCompra: encabezadoCompraId, 
                     
            },
        });
    }


    response.json(nuevoEncabezado); 
  };


  //Actualizar
  module.exports.updateEncabezado = async (request, response, next) => {
    let enc = request.body;

    let idEnc = parseInt(request.params.id);


  
    const ActualizarEncabezado  = await prisma.encabezadoCompra.update({
        where: {
            id: idEnc,
          },
      data: {
        idUsuario: enc.idUsuario,
        idProveedor: enc.idProveedor, 
        idBodega: enc.idBodega,
  
      },
    }); 




    response.json(ActualizarEncabezado); 
  };


//Eliminar encabezado
  module.exports.deleteEncabezado = async (request, response, next) => {
  let idEncabezado = parseInt(request.params.id);

  await prisma.detalleCompra.deleteMany({
    where: {
      idEncabezadoCompra: idEncabezado,
    },
  });

  await prisma.encabezadoCompra.delete({
    where: {
      id: idEncabezado,
    },
  });
  

  response.json({ message: 'Se eliminó el detalle de manera correcta' });
};


