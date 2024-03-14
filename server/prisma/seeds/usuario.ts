import { Rol } from "@prisma/client";
export const usuarios = [
    //Usuario Admin
    {
        nombre: "Kimberly",
        apellidos: "Vargas Herrera",
        correo: "fabyvh1996@hotmail.com",
        contrasenna: "123456",
        rol: Rol.Administrador,
        estado: true
    },
    {
        nombre: "Andrey",
        apellidos: "Jimenez Porras",
        correo: "rajimenezp35@gmail.com",
        contrasenna: "123456",
        rol: Rol.Administrador,
        estado: true
    },

    {
        nombre: "Andrés",
        apellidos: "Hernandez Vázquez",
        correo: "hernandez@hotmail.com",
        contrasenna: "Hernandez",
        rol: Rol.Encargado,
        estado: true
    },


    {
        nombre: "Luis",
        apellidos: "Chavarria",
        correo: "chavarria@hotmail.com",
        contrasenna: "luis",
        rol: Rol.Encargado,
        estado: true
    },

    {
        nombre: "Felipe",
        apellidos: "Carranza Hernandez",
        correo: "fch@gmail.com",
        contrasenna: "Felipe",
        rol: Rol.Encargado,
        estado: true
    },

    {
        nombre: "Lulu",
        apellidos: "Lopez",
        correo: "lulu@yahoo.com",
        contrasenna: "Lulu",
        rol: Rol.Encargado,
        estado: true
    },

    {
        nombre: "Roberto",
        apellidos: "Barrantes",
        correo: "Rbar@yahoo.com",
        contrasenna: "barra",
        rol: Rol.Encargado,
        estado: true
    },


    {
        nombre: "Paola",
        apellidos: "Moya",
        correo: "moya@yahoo.com",
        contrasenna: "Paola",
        rol: Rol.Encargado,
        estado: true
    },
]