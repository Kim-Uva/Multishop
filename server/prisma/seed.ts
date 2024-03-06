import { PrismaClient } from "@prisma/client";
import { categoria } from "./seeds/categoria";
import { usuarios } from "./seeds/usuario";



const prisma = new PrismaClient();

const main = async () => {
    try {
        //Llamar a usuarios
        await prisma.usuario.createMany({
            data: usuarios
        });

        //Crear Bodegas
        await prisma.bodega.create({
            data: {
                nombre: "Bodega Costa",
                tamanno: 30,
                capacidad: 200,
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
                capacidad: 400,
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
                capacidad: 500,
                seguridad: true,

                usuario: {
                    connect: [ { id: 6 }, ],
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
                capacidad: 200,
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
                capacidad: 380,
                seguridad: true,

                usuario: {
                    connect: [ { id: 7 }],
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





    } catch (error) {
        throw error;
    }
}


main().catch((err) => {
    console.warn('Error al ejecutar el seeder:n', err)
}
)