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

  const categorianom = await prisma.categoria.findUnique({
    where: {
      id: body.idCategoria,
    },
  });

  const subCategorianom = await prisma.subCategoria.findUnique({
    where: {
      id: body.idSubCategoria,
    },
  });

  //Generar el SKU
  let nombreSubCategoria = subCategorianom.nombre;
  let nombreCategoria = categorianom.nombre;

  let categoriaCod = nombreCategoria.substring(0, 3).toUpperCase();
  let subCategoriaCod = nombreSubCategoria.substring(0, 3).toUpperCase();

  const nuevoProducto = await prisma.producto.create({
    data: {
      nombre: body.nombre,
      descripcion: body.descripcion,
      stock: 0,
      precio: body.precio,
      estadoProducto: body.estadoProducto,
      idCategoria: body.idCategoria,
      idSubCategoria: body.idSubCategoria,
    },
  });

  let idCodigo = nuevoProducto.id.toString().padStart(2, "0"); // Asegura que el identificador tenga al menos 2 dígitos

  let SKU = `${categoriaCod}_${subCategoriaCod}_${idCodigo}`;

  await prisma.producto.update({
    where: {
      id: nuevoProducto.id,
    },

    data: {
      codigoProducto: SKU,
    },
  });

  response.json(nuevoProducto);
};


//Actualizar Producto
module.exports.update = async (request, response, next) => {
  try {
    let producto = request.body;
    let idProducto = parseInt(request.params.id);

    const categorianom = await prisma.categoria.findUnique({
      where: {
        id: producto.idCategoria,
      },
    });

    const subCategorianom = await prisma.subCategoria.findUnique({
      where: {
        id: producto.idSubCategoria,
      },
    });

    //Generar el SKU act
    let nombreSubCategoria = subCategorianom.nombre;
    let nombreCategoria = categorianom.nombre;

    let categoriaCod = nombreCategoria.substring(0, 3).toUpperCase();
    let subCategoriaCod = nombreSubCategoria.substring(0, 3).toUpperCase();
    let idCodigo = idProducto.toString().padStart(2, "0"); // Asegura que el identificador tenga al menos 2 dígitos

    let SKU = `${categoriaCod}_${subCategoriaCod}_${idCodigo}`;

    const actualizarProducto = await prisma.producto.update({
      where: {
        id: idProducto,
      },

      data: {
        codigoProducto: SKU,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        stock: producto.stock,
        precio: producto.precio,
        estadoProducto: producto.estadoProducto,
        idCategoria: producto.idCategoria,
        idSubCategoria: producto.idSubCategoria,
      },
    });

    response.json(actualizarProducto);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    response.status(500).json({ error: "Error interno del servidor" });
  }
};

//Eliminar producto
module.exports.delete = async (request, response, next) => {
  let idProducto = parseInt(request.params.id);

  await prisma.producto.delete({
    where: {
      id: idProducto,
    },
  });

  response.json({ message: "Se eliminó el producto de manera correcta" });
};
