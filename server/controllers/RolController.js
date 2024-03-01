const { PrismaClient, Rol } = require("@prisma/client");


const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  let listaRoles = [];
  listaRoles.unshift({
    ["id"]: 1,
    ["nombre"]: rol.Administrador,
  });
  listaRoles.unshift({
    ["id"]: 2,
    ["nombre"]: rol.Encargado,
  });



  response.json(listaRoles);
};
module.exports.getById = async (request, response, next) => {
  let id = request.params.id;
  let nombre = "";
  switch (Rol[id]) {
    case Rol.Administrador:
      nombre = "Administrador";
      break;
    case Rol.Encargado:
      nombre = "Encargado";
      break;
    default:
      nombre = "Encargado";
      break;
  }
  let rol = { ["id"]: Rol[id], ["nombre"]: nombre };
  response.json(rol);
};

