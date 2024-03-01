const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const usuarios = await prisma.usuario.findMany({
        orderBy:{
            nombre:'asc'
           } 
    });
    response.json(usuarios);
  };


  module.exports.getById = async (request, response, next) => {
    let idUsuario = parseInt(request.params.id)
    const usuarios = await prisma.usuario.findUnique({
      where: {
        id: idUsuario,
      },
   
    });
    response.json(usuarios);
  };

  //Crear Usuario
  module.exports.create = async (request, response, next) => {
    let body=request.body;

    const nuevoUsuario = await prisma.usuario.create({
        data: {
            nombre: body.nombre,
            apellidos: body.apellidos,
             correo: body.correo,
             contrasenna: body.contrasenna,

        }
    })
    response.json(nuevoUsuario)

  }
