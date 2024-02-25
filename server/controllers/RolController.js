const { PrismaClient, Rol } = require("@prisma/client");


const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  let listaRoles = [];
  for (let element in Rol) {
    switch (element) {
      case Rol.Administrador:
        listaRoles.unshift({
          ["id"]: element,
          ["nombre"]: "Administrador",
        });
        break;
      case Rol.Encargado:
        listaRoles.unshift({
          ["id"]: element,
          ["nombre"]: "Encargado",
        });
        break;
      default:
        listaRoles.unshift({ ["id"]: Rol.Encargado, ["nombre"]: "Encargado" });
        break;
    }
  }

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

