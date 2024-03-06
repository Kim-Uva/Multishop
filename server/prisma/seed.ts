import{PrismaClient} from "@prisma/client";
import { categoria } from "./seeds/categoria";



const prisma= new PrismaClient();

const main = async() =>{
    try{
        //Llamar a las categorias
        await prisma.categoria.createMany({
            data: categoria 
        });

        //Subcategorias 
        await prisma.subCategoria.create({
            data: {
                nombre:'Dell',

                categorias:{
                    connect: { id: 1 }
                },
            },
            
        });

        await prisma.subCategoria.create({
            data: {
                nombre:'Lenovo',

                categorias:{
                    connect: { id: 1 }
                },
            },
            
        });

        await prisma.subCategoria.create({
            data: {
                nombre:'Acer',
                

                categorias:{
                    connect: { id: 1 }
                },
            },
            
        });

        await prisma.subCategoria.create({
            data: {
                nombre:'Hp',

                categorias:{
                    connect: { id: 1 }
                },
            },
            
        });

        await prisma.subCategoria.create({
            data: {
                nombre:'Razer',

                categorias:{
                    connect:[{ id: 1 }, { id:5}]
                },
            },
            
        });

        await prisma.subCategoria.create({
            data: {
                nombre:'Logitech',

                categorias:{
                    connect: { id: 1 }
                },
            },
            
        });


        await prisma.subCategoria.create({
            data: {
                nombre:'Samsung',

                categorias:{
                    connect: [{ id: 2 }, { id:3 }, { id:4 }, { id:5 } ]
                    
                },
            },
            
        });

        await prisma.subCategoria.create({
            data: {
                nombre:'Sony',

                categorias:{
                    connect: [{ id: 2 }, { id:3 }, { id:4 }, { id:5 } ]
                },
            },
            
        });

        await prisma.subCategoria.create({
            data: {
                nombre:'Apple',

                categorias:{
                    connect:[{ id: 2 }, { id:4 }, { id:5 }]
                },
            },
            
        });

        await prisma.subCategoria.create({
            data: {
                nombre:'Xiaomi',

                categorias:{
                    connect:[{ id: 2 }, { id:4}]
                },
            },
            
        });

        await prisma.subCategoria.create({
            data: {
                nombre:'Huawei',

                categorias:{
                    connect:[{ id: 2 }, { id:4}]
                },
            },
            
        });

             
        await prisma.subCategoria.create({
            data: {
                nombre:'TCL',

                categorias:{
                    connect: { id: 3 }
                },
            },
            
        });
             
        await prisma.subCategoria.create({
            data: {
                nombre:'LG',

                categorias:{
                    connect: { id: 3 }                    
                },
            },
            
        });
      
        await prisma.subCategoria.create({
            data: {
                nombre:'Bitz',

                categorias:{
                    connect: { id: 5 }                    
                },
            },
            
        });


        
        

    } catch (error) {
        throw error;
    }
}


main().catch((err)=>{
    console.warn('Error al ejecutar el seeder:n', err)
    }
    )