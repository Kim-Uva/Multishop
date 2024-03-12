import { PrismaClient } from "@prisma/client";
import { categoria } from "./seeds/categoria";
import { usuarios } from "./seeds/usuario";
import { estado } from "./seeds/estado";



const prisma = new PrismaClient();

const main = async () => {
    try {
        //Llamar a usuarios
        await prisma.usuario.createMany({
            data: usuarios
        });

        //Llamar a estados
        await prisma.estado.createMany({
            data: estado
        });



        //Crear Bodegas
        await prisma.bodega.create({
            data: {
                nombre: "Bodega Costa",
                tamanno: 30,
                capacidad: 250,
                seguridad: true,

                usuario: {
                    connect: [{ id: 4 }],
                },

                ubicacion: {
                    create: {
                        idProvincia: 6,
                        idCanton: 1,
                        idDistrito: 3,
                        direccionExacta: "Muelle Paseo de los turistas"
                    }

                },
            },
        });

        await prisma.bodega.create({
            data: {
                nombre: "Bodega Valle Central",
                tamanno: 50,
                capacidad: 500,
                seguridad: true,

                usuario: {
                    connect: [{ id: 2 }, { id: 5 }],
                },

                ubicacion: {
                    create: {
                        idProvincia: 2,
                        idCanton: 1,
                        idDistrito: 1,
                        direccionExacta: "Alajuela San Ramón"
                    }

                },
            },
        });

        await prisma.bodega.create({
            data: {
                nombre: "Bodega Capital",
                tamanno: 70,
                capacidad: 700,
                seguridad: true,

                usuario: {
                    connect: [{ id: 6 },],
                },

                ubicacion: {
                    create: {
                        idProvincia: 1,
                        idCanton: 1,
                        idDistrito: 1,
                        direccionExacta: "San Jose por el Hospital de niños"
                    }

                },
            },
        });


        await prisma.bodega.create({
            data: {
                nombre: "Bodega Amarilla y Roja",
                tamanno: 20,
                capacidad: 250,
                seguridad: true,

                usuario: {
                    connect: [{ id: 3 }],
                },

                ubicacion: {
                    create: {
                        idProvincia: 4,
                        idCanton: 1,
                        idDistrito: 1,
                        direccionExacta: "San Jose La Montaña"
                    }

                },
            },
        });

        await prisma.bodega.create({
            data: {
                nombre: "Bodega Rio",
                tamanno: 38,
                capacidad: 400,
                seguridad: true,

                usuario: {
                    connect: [{ id: 7 }],
                },

                ubicacion: {
                    create: {
                        idProvincia: 4,
                        idCanton: 1,
                        idDistrito: 1,
                        direccionExacta: "Tres ríos Cartago"
                    }

                },
            },
        });

        //////////

        //Llamar a las categorias
        await prisma.categoria.createMany({
            data: categoria
        });

        //Subcategorias 
        await prisma.subCategoria.create({
            data: {
                nombre: 'Dell',

                categorias: {
                    connect: { id: 1 }
                },
            },

        });

        await prisma.subCategoria.create({
            data: {
                nombre: 'Lenovo',

                categorias: {
                    connect: { id: 1 }
                },
            },

        });

        await prisma.subCategoria.create({
            data: {
                nombre: 'Acer',


                categorias: {
                    connect: { id: 1 }
                },
            },

        });

        await prisma.subCategoria.create({
            data: {
                nombre: 'Hp',

                categorias: {
                    connect: { id: 1 }
                },
            },

        });

        await prisma.subCategoria.create({
            data: {
                nombre: 'Razer',

                categorias: {
                    connect: [{ id: 1 }, { id: 5 }]
                },
            },

        });

        await prisma.subCategoria.create({
            data: {
                nombre: 'Logitech',

                categorias: {
                    connect: { id: 1 }
                },
            },

        });


        await prisma.subCategoria.create({
            data: {
                nombre: 'Samsung',

                categorias: {
                    connect: [{ id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]

                },
            },

        });

        await prisma.subCategoria.create({
            data: {
                nombre: 'Sony',

                categorias: {
                    connect: [{ id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
                },
            },

        });

        await prisma.subCategoria.create({
            data: {
                nombre: 'Apple',

                categorias: {
                    connect: [{ id: 2 }, { id: 4 }, { id: 5 }]
                },
            },

        });

        await prisma.subCategoria.create({
            data: {
                nombre: 'Xiaomi',

                categorias: {
                    connect: [{ id: 2 }, { id: 4 }]
                },
            },

        });

        await prisma.subCategoria.create({
            data: {
                nombre: 'Huawei',

                categorias: {
                    connect: [{ id: 2 }, { id: 4 }]
                },
            },

        });


        await prisma.subCategoria.create({
            data: {
                nombre: 'TCL',

                categorias: {
                    connect: { id: 3 }
                },
            },

        });

        await prisma.subCategoria.create({
            data: {
                nombre: 'LG',

                categorias: {
                    connect: { id: 3 }
                },
            },

        });

        await prisma.subCategoria.create({
            data: {
                nombre: 'Bitz',

                categorias: {
                    connect: { id: 5 }
                },
            },

        });



        //////////Producto/////////     
        await prisma.producto.create({
            data:
            {

                nombre: "HP Envy x360",
                codigoProducto: "COM_HP_01",
                descripcion: "Laptop convertible con potencia y versatilidad",
                precio: 120000,
                stock: 12,
                estadoProducto: false,
                idCategoria: 1,
                idSubCategoria: 4,

                invProductos: {
                    createMany: {
                        data: [
                            { idUsuarioRegistro: 2, cantidadMinima: 10, cantidadMaxima: 50, cantidad:30, idBodega:2, },
                            { idUsuarioRegistro: 7, cantidadMinima: 20, cantidadMaxima: 75, cantidad:50, idBodega:5 },
                            { idUsuarioRegistro: 6, cantidadMinima: 10, cantidadMaxima: 100, cantidad:75, idBodega:3 }
                        
                        ]
                    }

                }


            },

        });

        await prisma.producto.create({
            data:
            {
                nombre: "Lenovo ThinkPad X1 Carbon",
                codigoProducto: "COM_LEN_02",
                descripcion: "Ultrabook empresarial ultraligero y potente",
                precio: 110000,
                stock: 8,
                estadoProducto: false,
                idCategoria: 1,
                idSubCategoria: 2,

                invProductos: {
                    createMany: {
                        data: [
                           
                            { idUsuarioRegistro: 4, cantidadMinima: 10, cantidadMaxima: 50, cantidad:40, idBodega:1 }
                        
                        ]
                    }

                }
            },

        });

        await prisma.producto.create({
            data:
            {
                nombre: "Lenovo ThinkPad X1 Carbon",
                codigoProducto: "COM_LEN_03",
                descripcion: "Ultrabook empresarial ultraligero y potente",
                precio: 110000,
                stock: 8,
                estadoProducto: true,
                idCategoria: 1,
                idSubCategoria: 2,

                invProductos: {
                    createMany: {
                        data: [
                           
                            { idUsuarioRegistro: 3, cantidadMinima: 20, cantidadMaxima: 75, cantidad:50, idBodega:4 },
                            { idUsuarioRegistro: 7, cantidadMinima: 10, cantidadMaxima: 75, cantidad:65, idBodega:5 }
                        
                        ]
                    }

                }
            },

        });





        await prisma.producto.create({
            data:
            {
                nombre: "Huawei P40 Pro",
                descripcion: "Teléfono Android con cámara Leica de alta calidad.",
                precio: 130000,
                stock: 8,
                estadoProducto: true,
                idCategoria: 2,
                idSubCategoria: 11,
                codigoProducto: "TEL_HUA_04",

                invProductos: {
                    createMany: {
                        data: [
                           
                            { idUsuarioRegistro: 3, cantidadMinima: 20, cantidadMaxima: 75, cantidad:50, idBodega:4 },
                            { idUsuarioRegistro: 7, cantidadMinima: 10, cantidadMaxima: 75, cantidad:70, idBodega:5 },                     

                        ]
                    }

                }
            },
        });


        await prisma.producto.create({
            data:
            {
                nombre: "Xiaomi Mi 11",
                descripcion: "Teléfono con potente procesador Snapdragon y pantalla AMOLED.",
                precio: 120000,
                stock: 6,
                estadoProducto: false,
                idCategoria: 2,
                idSubCategoria: 10,
                codigoProducto: "TEL_XIA_05",

                invProductos: {
                    createMany: {
                        data: [
                           
                            { idUsuarioRegistro: 5, cantidadMinima: 20, cantidadMaxima: 75, cantidad:50, idBodega:2 },
                            { idUsuarioRegistro: 6, cantidadMinima: 10, cantidadMaxima: 50, cantidad:15, idBodega:3 }


                        ]
                    }

                }
            },
        });

        await prisma.producto.create({
            data:
            {
                nombre: "Samsung Galaxy Buds Pro",
                descripcion: "Audífonos inalámbricos con cancelación de ruido activa.",
                precio: 80000,
                stock: 15,
                estadoProducto: true,
                idCategoria: 5,
                idSubCategoria: 7,
                codigoProducto: "AUD_SAM_06",

                invProductos: {
                    createMany: {
                        data: [
                           
                            { idUsuarioRegistro: 6, cantidadMinima: 10, cantidadMaxima: 50, cantidad:15, idBodega:3}
                        ]
                    }

                }
            },
        });

        await prisma.producto.create({
            data:
            {
                nombre: "Razer Opus",
                descripcion: "Audífonos con sonido THX Certified y cancelación activa de ruido.",
                precio: 100000,
                stock: 10,
                estadoProducto: true,
                idCategoria: 5,
                idSubCategoria: 5,
                codigoProducto: "AUD_RAZ_07",


                
                invProductos: {
                    createMany: {
                        data: [
                           
                            { idUsuarioRegistro: 2, cantidadMinima: 10, cantidadMaxima: 50, cantidad:30, idBodega:2 },
                            { idUsuarioRegistro: 7, cantidadMinima: 20, cantidadMaxima: 75, cantidad:50, idBodega:5 },
                            { idUsuarioRegistro: 6, cantidadMinima: 10, cantidadMaxima: 100, cantidad:75, idBodega:3 }                       
                         ]
                    }

                }
            },
        });

        /////////////Proveedores///////////

        await prisma.proveedor.create({
            data:
            {
                identificacion: 3101780001,
                nombreProveedor: "Empresa Tech S.A.",
                correoElectronico: "info@empresaabc.com",
                telefono: 24423333,

                ubicacion: {
                    create: {
                        idProvincia: 1,
                        idCanton: 1,
                        idDistrito: 1,
                        direccionExacta: "100 metros norte del parque central"
                    }

                }
            }
        });


        await prisma.proveedor.create({
            data:
            {
                identificacion: 3103120003,
                nombreProveedor: "Importaciones bytes",
                correoElectronico: "info@importacionesqrs.com",
                telefono: 26665555,
                ubicacion: {
                    create: {
                        idProvincia: 3,
                        idCanton: 3,
                        idDistrito: 3,
                        direccionExacta: "200 metros al oeste del supermercado"
                    }

                }
            }
        });


        await prisma.proveedor.create({
            data:
            {
                identificacion: 3102450002,
                nombreProveedor: "Intelec",
                correoElectronico: "Intelec@distribuidoraxyz.com",
                telefono: 28884444,
                ubicacion: {
                    create: {
                        idProvincia: 2,
                        idCanton: 2,
                        idDistrito: 2,
                        direccionExacta: "Frente a la estación de tren"
                    }

                }
            }
        });

        await prisma.proveedor.create({
            data:
            {
                identificacion: 3102450002,
                nombreProveedor: "Bytestore S.A",
                correoElectronico: "Bytestore@gmail.com",
                telefono: 28884444,
                ubicacion: {
                    create: {
                        idProvincia: 2,
                        idCanton: 2,
                        idDistrito: 2,
                        direccionExacta: "Por el hospital viejo"
                    }

                }
            }
        });

        ///////// Ordenes de compra/////////

        const encabezadosCompraData = [
            {
                idUsuario: 2,
                idProveedor: 4,
                idBodega: 2,
                detalleCompra: [
                    { idProducto: 1, cantidad: 2 },
                    { idProducto: 2, cantidad: 3 },
                ],
            },

            {
                idUsuario: 4,
                idProveedor: 2,
                idBodega: 1,
                detalleCompra: [
                    { idProducto: 5, cantidad: 12 },
                    { idProducto: 3, cantidad: 3 },
                    { idProducto: 6, cantidad: 15 },

                ],
            },

            {
                idUsuario: 5,
                idProveedor: 4,
                idBodega: 2,
                detalleCompra: [
                    { idProducto: 4, cantidad: 19 },
                    { idProducto: 7, cantidad: 4 },
                    { idProducto: 2, cantidad: 10 },
                ],
            },

            {
                idUsuario: 3,
                idProveedor: 3,
                idBodega: 4,
                detalleCompra: [
                    { idProducto: 4, cantidad: 19 },
                    { idProducto: 7, cantidad: 4 },
                    { idProducto: 3, cantidad: 10 },
                ],
            },
        ];

        // Crear encabezados de compra y sus compras de detalle asociadas
        for (const encabezadoCompraData of encabezadosCompraData) {
            const encabezadoCompra = await prisma.encabezadoCompra.create({
                data: {
                    idUsuario: encabezadoCompraData.idUsuario,
                    idProveedor: encabezadoCompraData.idProveedor,
                    idBodega: encabezadoCompraData.idBodega,
                },
            });

            const comprasDetalle = await Promise.all(encabezadoCompraData.detalleCompra.map(async detalle => {
                const producto = await prisma.producto.findUnique({
                    where: {
                        id: detalle.idProducto,
                    },
                    select: {
                        precio: true,
                    },
                });

                if (!producto) {
                    throw new Error(`No se encontró el producto con ID ${detalle.idProducto}.`);
                }

                const precioTotal = Number(producto.precio) * detalle.cantidad;


                return {
                    idEncabezadoCompra: encabezadoCompra.id,
                    idProducto: detalle.idProducto,
                    cantidad: detalle.cantidad,
                    precio: precioTotal,
                };
            }));

            // Crear todas las compras de detalle para el encabezado de compra actual
            await prisma.detalleCompra.createMany({
                data: comprasDetalle,
            });
        }


    } catch (error) {
        throw error;
    }
}


main().catch((err) => {
    console.warn('Error al ejecutar el seeder:n', err)
}
)