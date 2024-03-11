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

    const nuevoProveedor = await prisma.proveedor.create({
      data:{
        identificacion: body.identificacion,
        nombreProveedor: body.nombreProveedor,
        correoElectronico: body.correoElectronico,
        telefono: body.telefono,

           // Crear la ubicación al mismo tiempo
           ubicacion: {
            create: {
              idProvincia: body.ubicacion.idProvincia,
              idCanton: body.ubicacion.idCanton,
              idDistrito: body.ubicacion.idDistrito,
              direccionExacta: body.ubicacion.direccionExacta
            }
           
      },
      } 
    })
    response.json(nuevoProveedor);
}  


//Actualizar
module.exports.update = async (request, response, next) => {
  try {
    let proveedor = request.body;
    let idProveedor = parseInt(request.params.id);



    const actualizarProveedor = await prisma.proveedor.update({
        where: {
            id: idProveedor,

        },

        data: {
          identificacion: proveedor.identificacion,
          nombreProveedor: proveedor.nombreProveedor,
          correoElectronico: proveedor.correoElectronico,
          telefono: proveedor.telefono,
            
            ubicacion:{
              update:{
                idProvincia: proveedor.ubicacion.idProvincia,
                idCanton: proveedor.ubicacion.idCanton,
                idDistrito: proveedor.ubicacion.idDistrito,
                direccionExacta: proveedor.ubicacion.direccionExacta,
                
              },

            }, 

          
        },
    });

    response.json(actualizarProveedor);
 
} catch (error) {
    console.error('Error al actualizar el proveedor:', error);
    response.status(500).json({ error: 'Error interno del servidor' });
}


}
