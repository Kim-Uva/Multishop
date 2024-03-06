const { PrismaClient, Rol } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

module.exports.get = async (request, response, next) => {
    const productos = await prisma.producto.findMany({
        orderBy: {
            nombre: "asc",
        },
    });
    response.json(productos);
};

module.exports.getById = async (request, response, next) => {
    let idProducto = parseInt(request.params.id);
    const productos = await prisma.producto.findUnique({
        where: {
            id: idProducto,
        },
    });
    response.json(productos);
};

//Crear Producto
module.exports.create = async (request, response, next) => {
    let body = request.body;

    const nuevoProducto = await prisma.producto.create({
        data: {
            codigoProducto: body.codigoProducto,
            nombre: body.nombre,
            descripcion: body.descripcion,
            stock: body.stock,
            precio: body.precio,
            estadoProducto: body.estadoProducto,
            idSubCategoria: body.idSubCategoria
        },
    });

    response.json(nuevoProducto);
};

//Actualizar Producto
module.exports.update = async (request, response, next) => {

    try {
        let producto = request.body;
        let idProducto = parseInt(request.params.id);

        const actualizarProducto = await prisma.producto.update({
            where: {
                id: idProducto
            },

            data: {
                codigoProducto: producto.codigoProducto,
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                stock: producto.stock,
                precio: producto.precio,
                estadoProducto: producto.estadoProducto,
                idSubCategoria: producto.idSubCategoria
            },
        });

        response.json(actualizarProducto);
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        response.status(500).json({ error: 'Error interno del servidor' });
    }

};

//Eliminar producto
module.exports.delete = async (request, response, next) => {
    let idProducto = parseInt(request.params.id);

    await prisma.producto.delete({
        where: {
            id: idProducto
        }
    });

    response.json({ message: 'Se eliminó el producto de manera correcta' });
};