const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

const prisma = new PrismaClient();


module.exports.getProvincias = async (request,response, next)=>{

try{
     axiosResponse  = await axios.get('https://ubicaciones.paginasweb.cr/provincias.json');
    const provincias = axiosResponse.data;

    
   response.json(provincias);

} catch (error) {
    console.error('Error al obtener provincias:', error);
    response.status(500).json({ error: 'Error al obtener provincias' });    
}

};

module.exports.getCantonesPorProvincia = async (request, response, next) => {
     try {
       const idProvincia = request.params.idProvincia;
       const axiosResponse = await axios.get(`https://ubicaciones.paginasweb.cr/provincia/${idProvincia}/cantones.json`);
       const cantones = axiosResponse.data;
       response.json(cantones);

     } catch (error) {
       console.error('Error al obtener cantones:', error);
       response.status(500).json({ error: 'Error al obtener cantones' });
     }
   };


   module.exports.getDistritoporCanton = async (request, response, next) => {
     try {
       const idProvincia = request.params.idProvincia;
       const idCanton = request.params.idProvincia;

       const axiosResponse = await axios.get(`https://ubicaciones.paginasweb.cr/provincia/${idProvincia}/canton/${idCanton}/distritos.json`);
       const distritos = axiosResponse.data;
       response.json(distritos);
       
     } catch (error) {
       console.error('Error al obtener distritos:', error);
       response.status(500).json({ error: 'Error al obtener distritos' });
     }
   }; 