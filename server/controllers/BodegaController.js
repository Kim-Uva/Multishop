const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const Bodega = await prisma.bodega.findMany({
    include: {
      usuario: true,
      ubicacion: true,
    },
  });
  response.json(Bodega);
};

module.exports.getById = async (request, response, next) => {
  let idBodega = parseInt(request.params.id);
  const Bodega = await prisma.bodega.findUnique({
    where: {
      id: idBodega,
    },
    include: {
      usuario: true,
      ubicacion: true,
    },
  });
  response.json(Bodega);
};

//Crear Bodega
module.exports.create = async (request, response, next) => {
  let body = request.body;

  const nuevoBodega = await prisma.bodega.create({
    data: {
      nombre: body.nombre,
      tamanno: body.tamanno,
      capacidad: body.capacidad,
      seguridad: body.seguridad,

      usuario: {
        connect: body.usuario,
      },

      // Crear la ubicación al mismo tiempo
      ubicacion: {
        create: {
          idProvincia: body.ubicacion.idProvincia,
          idCanton: body.ubicacion.idCanton,
          idDistrito: body.ubicacion.idDistrito,
          direccionExacta: body.ubicacion.direccionExacta,
        },
      },
    },
  });

  response.json(nuevoBodega);
};

//Actualizar Bodega
module.exports.update = async (request, response, next) => {
  try {
    let bodega = request.body;
    let idBodega = parseInt(request.params.id);

    const bodegaAnterior = await prisma.bodega.findUnique({
      where: { id: idBodega },
      include: {
        usuario: {
          select: {
            id: true,
          },
        },
      },
    });

    const actualizarBodega = await prisma.bodega.update({
      where: {
        id: idBodega,
      },

      data: {
        nombre: bodega.nombre,
        tamanno: bodega.tamanno,
        capacidad: bodega.capacidad,
        seguridad: bodega.seguridad,

        ubicacion: {
          update: {
            idProvincia: bodega.ubicacion.idProvincia,
            idCanton: bodega.ubicacion.idCanton,
            idDistrito: bodega.ubicacion.idDistrito,
            direccionExacta: bodega.ubicacion.direccionExacta,
          },
        },

        usuario: {
          disconnect: bodegaAnterior.usuario,
          connect: bodega.usuario,
        },
      },
    });

    response.json(actualizarBodega);
  } catch (error) {
    console.error("Error al actualizar la bodega:", error);
    response.status(500).json({ error: "Error interno del servidor" });
  }
};

//Eliminar bodega
module.exports.delete = async (request, response, next) => {
  let idBodega = parseInt(request.params.id);

  await prisma.bodega.delete({
    where: {
      id: idBodega,
    },
  });

  response.json({ message: "Se eliminó la bodega de manera correcta" });
};
