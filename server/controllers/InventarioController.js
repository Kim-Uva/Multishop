const { PrismaClient, Rol } = require("@prisma/client");
const prisma = new PrismaClient();

//Get inventarios

module.exports.getInventarios = async (request, response, next) => {
    const inventarios = await prisma.inventario.findMany();
    response.json(inventarios);
}

//Get inventario by id Producto
module.exports.getInventarioByIdProducto = async (request, response, next) => {
    const { idProducto } = request.params.idProducto;

    const inventario = await prisma.inventario.findUnique({
        where: {
            idProducto: idProducto
        }
    });

    response.json(inventario);
}


module.exports.getInventarioByIdBodega = async (request, response, next) => {
    const { idBodega } = request.params.idBodega;

    const inventario = await prisma.inventario.findUnique({
        where: {
            idBodega: idBodega,
        }
    });

    response.json(inventario);
}

//Create inventario
module.exports.createInventario = async (request, response, next) => {
    const {
        idBodega,
        idProducto,
        idUsuarioRegistro,
        cantidad,
        cantidadMinima,
        cantidadMaxima
    } = request.body;

    const inventario = await prisma.inventario.create({
        data: {
            idBodega,
            idProducto,
            idUsuarioRegistro,
            cantidad,
            cantidadMinima,
            cantidadMaxima
        }
    });

    response.json(inventario);
}

//Update inventario
module.exports.updateInventario = async (request, response, next) => {
    const { pIdBodega } = request.params.idBodega;
    const {
        idBodega,
        idProducto,
        idUsuarioActualizo,
        cantidad,
        cantidadMinima,
        cantidadMaxima
    } = request.body;

    const inventario = await prisma.inventario.update({
        where: {
            idBodega: pIdBodega
        },
        data: {
            idBodega,
            idProducto,
            idUsuarioActualizo,
            cantidad,
            cantidadMinima,
            cantidadMaxima
        }
    });

    response.json(inventario);
}

//Delete inventario
module.exports.deleteInventario = async (request, response, next) => {
    const { idBodega } = request.params;

    await prisma.inventario.delete({
        where: {
            idBodega: idBodega,
        }
    });

    response.json({ message: 'Producto eliminado del inventario' });
}