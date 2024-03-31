const { PrismaClient, Rol } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  let listaRoles = [];

  let idCounter = 1;
  for (const rol in Rol) {
    if (Object.prototype.hasOwnProperty.call(Rol, rol)) {
      listaRoles.push({ id: idCounter++, nombre: rol });
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
