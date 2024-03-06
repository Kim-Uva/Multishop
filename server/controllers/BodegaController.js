const { PrismaClient, Rol } = require("@prisma/client");


const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const Bodega = await prisma.bodega.findMany({
        orderBy: {
            nombre: 'asc'
        }
    });
    response.json(Bodega);
};