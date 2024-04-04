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
  let ubicacion = 5;
  let identificacion = parseInt(body.identificacion);
  let telefono = parseInt(body.telefono)
  const nuevoProveedor = await prisma.proveedor.create({
    data: {
      identificacion: identificacion,
      nombreProveedor: body.nombreProveedor,
      correoElectronico: body.correoElectronico,
      telefono: telefono,
      idUbicacion: ubicacion
      // Crear la ubicación al mismo tiempo

    }
  })
  response.json(nuevoProveedor);
}


//Actualizar
module.exports.update = async (request, response, next) => {
  try {
    let proveedor = request.body;
    let idProveedor = parseInt(request.params.id);
    let ubicacion = 5;
    let identificacion = parseInt(proveedor.identificacion);
    let telefono = parseInt(proveedor.telefono)


    const actualizarProveedor = await prisma.proveedor.update({
      where: {
        id: idProveedor,

      },

      data: {
        identificacion: identificacion,
        nombreProveedor: proveedor.nombreProveedor,
        correoElectronico: proveedor.correoElectronico,
        telefono: telefono,
        idUbicacion: ubicacion


      },
    });

    response.json(actualizarProveedor);

  } catch (error) {
    console.error('Error al actualizar el proveedor:', error);
    response.status(500).json({ error: 'Error interno del servidor' });
  }


}
