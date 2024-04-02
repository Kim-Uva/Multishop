const { PrismaClient, Rol } = require("@prisma/client");
const prisma = new PrismaClient();

//Get inventarios

module.exports.getInventarios = async (request, response, next) => {
    const inventarios = await prisma.inventario.findMany({
        include: {
            producto: true,
            usuarioRegistro: true,
            usuarioActualizo: true,
        }
    });

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
    let body = request.body;
    let cantidad = parseInt(body.cantidad);
    let cantidadMaxima = parseInt(body.cantidadMinima);
    let cantidadMinima = parseInt(body.cantidadMaxima);

    let idUsuarioActualizo = 5;
    let idUsuarioRegistro = 5;
    // condicion para las cantidades 

    if (body.cantidadMinima > body.cantidadMaxima) {
        console.log("La cantidad no es válida.");
    }
    if (body.cantidad < body.cantidadMinima || body.cantidad > body.cantidadMaxima) {
        console.log("La cantidad está fuera del rango permitido.");

    }
    else {

        const inventario = await prisma.inventario.create({
            data: {
                idBodega: body.idBodega,
                idProducto: body.idProducto,
                cantidad: cantidad, //Cantidad disponible
                cantidadMinima:  cantidadMinima,
                cantidadMaxima:  cantidadMaxima,
                idUsuarioRegistro: idUsuarioRegistro,
                idUsuarioActualizo: idUsuarioActualizo,

            }
        });

        response.json(inventario);
    }
}

//Update inventario
module.exports.updateInventario = async (request, response, next) => {

    const idBodega = parseInt(request.params.id);
    const idProducto = parseInt(request.params.id);

    let inventario = request.body;


    if (inventario.cantidadMinima > inventario.cantidadMaxima) {
        console.log("La cantidad no es válida.");
    }
    if (inventario.cantidad < inventario.cantidadMinima || inventario.cantidad > inventario.cantidadMaxima) {
        console.log("La cantidad está fuera del rango permitido.");

    }


    const inventarioActualizado = await prisma.inventario.update({
        where: {
            idBodega: idBodega,
            idProducto: idProducto,

        },
        data: {
            idBodega: inventario.idBodega,
            idProducto: inventario.idProducto,
            idUsuarioActualizo: inventario.idUsuarioActualizo,
            cantidad: inventario.cantidad,
            cantidadMinima: inventario.cantidadMinima,
            cantidadMaxima: inventario.cantidadMaxima,
        }
    });


    response.json(inventarioActualizado);
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