const dotEnv = require('dotenv');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');
const cors = require('cors');
const logger = require('morgan');
const app = express();
const prism = new PrismaClient();
//---Archivos de rutas---
const UbicacionRouter = require("./routes/UbicacionRoutes")
const rolRouter = require("./routes/RolRoutes")
const usuarioRouter = require("./routes/UsuarioRoute")
const bodegaRouter = require("./routes/BodegaRoutes")
const productoRouter = require("./routes/ProductoRoute")
const inventarioRouter = require("./routes/InventarioRoutes")
const proveedorRouter = require("./routes/ProveedorRoute")
const ordenRouter = require("./routes/OrdenRoute")
const encabezadoRouter = require("./routes/EncabezadoRoutes")
const pedidoRouter = require("./routes/PedidoRoute")
const categoriaRouter = require("./routes/CategoriaRoute")
const subcategoria = require("./routes/SubCategoriaRoute")



// Acceder a la configuracion del archivo .env
dotEnv.config();
// Puero que escucha por defecto 300 o definido .env
const port = process.env.PORT || 3000;
// Middleware CORS para aceptar llamadas en el servidor
app.use(cors());
// Middleware para loggear las llamadas al servidor
app.use(logger('dev'));
// Middleware para gestionar Requests y Response json
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
//---- Definir rutas recordar actualizar ----
app.use('/ubicacion/', UbicacionRouter)
app.use('/rol/', rolRouter)
app.use('/usuario/', usuarioRouter)
app.use('/bodega/', bodegaRouter)
app.use('/producto/', productoRouter)
app.use('/inventario/', inventarioRouter)
app.use('/proveedor/', proveedorRouter)
app.use('/orden/', ordenRouter)
app.use('/encabezado/', encabezadoRouter)
app.use('/pedido/', pedidoRouter)
app.use('/categoria/', categoriaRouter)
app.use('/subcategoria/', subcategoria)




// Servidor
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log('Presione CTRL-C para deternerlo\n');
});
