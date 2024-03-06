
const { PrismaClient, Rol } = require("@prisma/client");
const prisma = new PrismaClient();

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const Bodega = await prisma.bodega.findMany({
        orderBy: {
            nombre: 'asc'
        }
    });
    response.json(Bodega);
};


module.exports.getById = async (request, response, next) => {
    let idBodega = parseInt(request.params.id)
    const Bodega = await prisma.bodega.findUnique({
        where: {
            id: idBodega,
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
            idUbicacion: body.idUbicacion,
            tamanno: body.tamanno,
            capacidad: body.capacidad,
            seguridad: body.seguridad
        },
    });

    response.json(nuevoBodega);
};

//Actualizar Bodega
module.exports.update = async (request, response, next) => {
    try {
        let bodega = request.body;
        let idBodega = parseInt(request.params.id);

        const actualizarBodega = await prisma.bodega.update({
            where: {
                id: idBodega
            },

            data: {
                nombre: bodega.nombre,
                idUbicacion: bodega.idUbicacion,
                tamanno: bodega.tamanno,
                capacidad: bodega.capacidad,
                seguridad: bodega.seguridad
            },
        });

        response.json(actualizarBodega);

    } catch (error) {
        console.error('Error al actualizar la bodega:', error);
        response.status(500).json({ error: 'Error interno del servidor' });
    }

};

//Eliminar bodega
module.exports.delete = async (request, response, next) => {
    let idBodega = parseInt(request.params.id);

    await prisma.bodega.delete({
        where: {
            id: idBodega
        }
    });

    response.json({ message: 'Se eliminó la bodega de manera correcta' });
};


