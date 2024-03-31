const { PrismaClient } = require("@prisma/client");
const axios = require("axios");

const prisma = new PrismaClient();

module.exports.getProvincias = async (request, response, next) => {
  try {
    axiosResponse = await axios.get(
      "https://ubicaciones.paginasweb.cr/provincias.json"
    );

    const provincias = axiosResponse.data;


    response.json(provincias);


  } catch (error) {
    console.error("Error al obtener distritos:", error);
    response.status(500).json({ error: "Error al obtener distritos" });
  }
};

module.exports.getCantonesPorProvincia = async (request, response, next) => {
  try {
    const idProvincia = request.params.idProvincia;
    const axiosResponse = await axios.get(
      `https://ubicaciones.paginasweb.cr/provincia/${idProvincia}/cantones.json`
    );
    const cantones = axiosResponse.data;
    response.json(cantones);
  } catch (error) {
    console.error("Error al obtener cantones:", error);
    response.status(500).json({ error: "Error al obtener cantones" });
  }
};

module.exports.getDistritoporCanton = async (request, response, next) => {
  try {
    const idProvincia = request.params.idProvincia;
    const idCanton = request.params.idProvincia;

    const axiosResponse = await axios.get(
      `https://ubicaciones.paginasweb.cr/provincia/${idProvincia}/canton/${idCanton}/distritos.json`
    );
    const distritos = axiosResponse.data;
    response.json(distritos);
  } catch (error) {
    console.error("Error al obtener distritos:", error);
    response.status(500).json({ error: "Error al obtener distritos" });
  }
};



//Crear Ubicación
module.exports.create = async (request, response, next) => {
  let body = request.body;

  const nuevaUbicacion = await prisma.ubicacion.create({
    data: {
      idProvincia: body.idProvincia,
      idCanton: body.idCanton,
      idDistrito: body.idDistrito,
      direccionExacta: body.direccionExacta
    }
  });

  response.json(nuevaUbicacion);
};

//Actualizar Ubicación
module.exports.update = async (request, response, next) => {

  try {
    let ubicacion = request.body;
    let idUbicacion = parseInt(request.params.id);

    const actualizarUbicacion = await prisma.ubicacion.update({
      where: {
        id: idUbicacion
      },

      data: {
        idProvincia: ubicacion.idProvincia,
        idCanton: ubicacion.idCanton,
        idDistrito: ubicacion.idDistrito,
        direccionExacta: ubicacion.direccionExacta
      },
    });

    response.json(actualizarUbicacion);
  } catch (error) {
    console.error('Error al actualizar la ubicación:', error);
    response.status(500).json({ error: 'Error interno del servidor' });
  }

};

//Eliminar ubicación
module.exports.delete = async (request, response, next) => {
  let idUbicacion = parseInt(request.params.id);

  await prisma.ubicacion.delete({
    where: {
      id: idUbicacion
    }
  });

  response.json({ message: 'Se eliminó la ubicación de manera correcta' });
};
