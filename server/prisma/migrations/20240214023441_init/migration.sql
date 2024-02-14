-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `nombreProveedor` VARCHAR(191) NULL,
    `correo` VARCHAR(191) NOT NULL,
    `contrasenna` VARCHAR(191) NOT NULL,
    `fechaRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `rol` ENUM('Administrador', 'Encargado', 'Proveeedor') NOT NULL,
    `idUbicacion` INTEGER NOT NULL,

    UNIQUE INDEX `Usuario_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubCategoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idCategoria` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigoProducto` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `idSubCategoria` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Foto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idProducto` INTEGER NOT NULL,
    `foto` LONGBLOB NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ubicacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idProvincia` INTEGER NOT NULL,
    `idCanton` INTEGER NOT NULL,
    `idDistrito` INTEGER NOT NULL,
    `idBarrio` INTEGER NOT NULL,

    UNIQUE INDEX `Ubicacion_idProvincia_key`(`idProvincia`),
    UNIQUE INDEX `Ubicacion_idCanton_key`(`idCanton`),
    UNIQUE INDEX `Ubicacion_idDistrito_key`(`idDistrito`),
    UNIQUE INDEX `Ubicacion_idBarrio_key`(`idBarrio`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Provincia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Canton` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idProvincia` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Distrito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idProvincia` INTEGER NOT NULL,
    `idCanton` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Barrio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idProvincia` INTEGER NOT NULL,
    `idCanton` INTEGER NOT NULL,
    `idDistrito` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bodega` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `idUbicacion` INTEGER NOT NULL,
    `tamanno` DOUBLE NOT NULL,
    `capacidad` DOUBLE NOT NULL,
    `seguridad` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BodegaProductos` (
    `idBodega` INTEGER NOT NULL,
    `idProducto` INTEGER NOT NULL,
    `idUsuario` INTEGER NOT NULL,
    `fechaRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`idBodega`, `idProducto`, `idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EncabezadoCompra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaCompra` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idUsuarioProveedor` INTEGER NOT NULL,
    `idUsuarioRegistro` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalleCompra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idEncabezadoCompra` INTEGER NOT NULL,
    `idProducto` INTEGER NOT NULL,
    `idBodega` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedido` (
    `idEncabezadoCompra` INTEGER NOT NULL,
    `fechaPedido` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idEstado` INTEGER NOT NULL,
    `observaciones` VARCHAR(191) NULL,

    PRIMARY KEY (`idEncabezadoCompra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TrasladoBodegas` (
    `idPedido` INTEGER NOT NULL,
    `idDestino` INTEGER NOT NULL,

    PRIMARY KEY (`idPedido`, `idDestino`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TrasladoDestino` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idBodegaDestino` INTEGER NOT NULL,
    `fechaRecibido` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idEstado` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Historial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idBodega` INTEGER NOT NULL,
    `idUsuarioRegistro` INTEGER NOT NULL,
    `idProducto` INTEGER NOT NULL,
    `fechaAjuste` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `justificacion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_idUbicacion_fkey` FOREIGN KEY (`idUbicacion`) REFERENCES `Ubicacion`(`idProvincia`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategoria` ADD CONSTRAINT `SubCategoria_idCategoria_fkey` FOREIGN KEY (`idCategoria`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_idSubCategoria_fkey` FOREIGN KEY (`idSubCategoria`) REFERENCES `SubCategoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Foto` ADD CONSTRAINT `Foto_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Provincia` ADD CONSTRAINT `Provincia_id_fkey` FOREIGN KEY (`id`) REFERENCES `Ubicacion`(`idProvincia`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Canton` ADD CONSTRAINT `Canton_idProvincia_fkey` FOREIGN KEY (`idProvincia`) REFERENCES `Provincia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Canton` ADD CONSTRAINT `Canton_id_fkey` FOREIGN KEY (`id`) REFERENCES `Ubicacion`(`idCanton`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Distrito` ADD CONSTRAINT `Distrito_idProvincia_fkey` FOREIGN KEY (`idProvincia`) REFERENCES `Provincia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Distrito` ADD CONSTRAINT `Distrito_idCanton_fkey` FOREIGN KEY (`idCanton`) REFERENCES `Canton`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Distrito` ADD CONSTRAINT `Distrito_id_fkey` FOREIGN KEY (`id`) REFERENCES `Ubicacion`(`idDistrito`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Barrio` ADD CONSTRAINT `Barrio_idProvincia_fkey` FOREIGN KEY (`idProvincia`) REFERENCES `Provincia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Barrio` ADD CONSTRAINT `Barrio_idCanton_fkey` FOREIGN KEY (`idCanton`) REFERENCES `Canton`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Barrio` ADD CONSTRAINT `Barrio_idDistrito_fkey` FOREIGN KEY (`idDistrito`) REFERENCES `Distrito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Barrio` ADD CONSTRAINT `Barrio_id_fkey` FOREIGN KEY (`id`) REFERENCES `Ubicacion`(`idBarrio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bodega` ADD CONSTRAINT `Bodega_idUbicacion_fkey` FOREIGN KEY (`idUbicacion`) REFERENCES `Ubicacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BodegaProductos` ADD CONSTRAINT `BodegaProductos_idBodega_fkey` FOREIGN KEY (`idBodega`) REFERENCES `Bodega`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BodegaProductos` ADD CONSTRAINT `BodegaProductos_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BodegaProductos` ADD CONSTRAINT `BodegaProductos_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EncabezadoCompra` ADD CONSTRAINT `EncabezadoCompra_idUsuarioProveedor_fkey` FOREIGN KEY (`idUsuarioProveedor`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleCompra` ADD CONSTRAINT `DetalleCompra_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleCompra` ADD CONSTRAINT `DetalleCompra_idEncabezadoCompra_fkey` FOREIGN KEY (`idEncabezadoCompra`) REFERENCES `EncabezadoCompra`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleCompra` ADD CONSTRAINT `DetalleCompra_idBodega_fkey` FOREIGN KEY (`idBodega`) REFERENCES `Bodega`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_idEstado_fkey` FOREIGN KEY (`idEstado`) REFERENCES `Estado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_idEncabezadoCompra_fkey` FOREIGN KEY (`idEncabezadoCompra`) REFERENCES `EncabezadoCompra`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrasladoBodegas` ADD CONSTRAINT `TrasladoBodegas_idPedido_fkey` FOREIGN KEY (`idPedido`) REFERENCES `Pedido`(`idEncabezadoCompra`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrasladoBodegas` ADD CONSTRAINT `TrasladoBodegas_idDestino_fkey` FOREIGN KEY (`idDestino`) REFERENCES `TrasladoDestino`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrasladoDestino` ADD CONSTRAINT `TrasladoDestino_idBodegaDestino_fkey` FOREIGN KEY (`idBodegaDestino`) REFERENCES `Bodega`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrasladoDestino` ADD CONSTRAINT `TrasladoDestino_idEstado_fkey` FOREIGN KEY (`idEstado`) REFERENCES `Estado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historial` ADD CONSTRAINT `Historial_idBodega_fkey` FOREIGN KEY (`idBodega`) REFERENCES `Bodega`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historial` ADD CONSTRAINT `Historial_idUsuarioRegistro_fkey` FOREIGN KEY (`idUsuarioRegistro`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historial` ADD CONSTRAINT `Historial_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
