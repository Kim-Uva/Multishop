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
  const id = parseInt(request.params.id);

    // Verificar si el ID es válido
    if (id < 1 || id > Object.keys(Rol).length) {
      return response.status(404).json({ error: "Rol no encontrado" });
    }

    // Obtener el nombre del rol por su posición en el enum
    const nombre = Object.keys(Rol)[id - 1];

    response.json({ id: id, nombre: nombre });
  
};