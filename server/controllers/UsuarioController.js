const { PrismaClient, Rol } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

module.exports.get = async (request, response, next) => {
  const usuarios = await prisma.usuario.findMany({
    orderBy: {
      nombre: "asc",
    },
  });
  response.json(usuarios);
};

module.exports.getById = async (request, response, next) => {
  let idUsuario = parseInt(request.params.id);
  const usuarios = await prisma.usuario.findUnique({
    where: {
      id: idUsuario,
    },
  });
  response.json(usuarios);
};

//Crear Usuario
module.exports.create = async (request, response, next) => {
  let body = request.body;

  // Para un token de contraseña
  const token = 10;
  bcrypt.hash(body.contrasenna, token, async (err, hash) => {
    if (err) {
      console.error("Error al generar el hash de la contraseña:", err);
      return;
    }

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre: body.nombre,
        apellidos: body.apellidos,
        correo: body.correo,
        contrasenna: hash,
        estado: body.estado,

        // bodega: {
        //    connect: body.idBodega,
        //  },
      },
    });

    response.json(nuevoUsuario);
  });
};

//Actualizar Usuario
module.exports.update = async (request, response, next) => {
  try {
  let usuario = request.body;
  let idUsuario = parseInt(request.params.id);

  const actualizarUsuario = await prisma.usuario.update({
    where: {
      id: idUsuario,
    },

    data: {
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      contrasenna: usuario.contrasenna,
      estado: usuario.estado
    },
  });
  response.json(actualizarUsuario);

} catch (error) {
  console.error('Error al actualizar el usuario:', error);
  response.status(500).json({ error: 'Error interno del servidor' });
}

};

//Eliminar usuario
module.exports.delete = async (request, response, next) => {
  let idUsuario = parseInt(request.params.id);
  await prisma.usuario.delete({
    where: {
      id: idUsuario,
    },
  });
  response.json({ message: 'Se eliminó el usuario de manera correcta' });
};
