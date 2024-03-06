const { PrismaClient, Rol } = require("@prisma/client");


const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  let listaRoles = [];
  let consecutivo = 0;

  for (let element in Rol) {
    consecutivo++;
    switch (element) {
      case Rol.Administrador:
        listaRoles.unshift({
          ["id"]: consecutivo,
          ["nombre"]: element,

        });
        break;
      case Rol.Encargado:
        listaRoles.unshift({


          ["id"]: consecutivo,
          ["nombre"]: element,
        });
        break;
      default:
        listaRoles.unshift({ ["id"]: consecutivo, ["nombre"]: "Cliente" });
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


