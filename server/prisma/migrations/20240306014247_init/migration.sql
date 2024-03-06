-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `contrasenna` VARCHAR(191) NOT NULL,
    `fechaRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `rol` ENUM('Administrador', 'Encargado') NOT NULL DEFAULT 'Encargado',
    `idBodega` INTEGER NULL,

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
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigoProducto` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `stock` INTEGER NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `estadoProducto` BOOLEAN NOT NULL,
    `idSubCategoria` INTEGER NOT NULL,

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
    `direccionExacta` VARCHAR(191) NULL,

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
CREATE TABLE `Inventario` (
    `idBodega` INTEGER NOT NULL,
    `idProducto` INTEGER NOT NULL,
    `idUsuarioRegistro` INTEGER NOT NULL,
    `idUsuarioActualizo` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `cantidadMinima` INTEGER NOT NULL,
    `cantidadMaxima` INTEGER NOT NULL,
    `fechaRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idBodega`, `idProducto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proveedor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `identificacion` INTEGER NOT NULL,
    `nombreProveedor` VARCHAR(191) NOT NULL,
    `idUbicacion` INTEGER NOT NULL,
    `correoElectronico` VARCHAR(191) NOT NULL,
    `telefono` INTEGER NOT NULL,

    UNIQUE INDEX `Proveedor_correoElectronico_key`(`correoElectronico`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EncabezadoCompra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaCompra` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idProveedor` INTEGER NOT NULL,
    `idUsuario` INTEGER NOT NULL,

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
    `idEstado` INTEGER NOT NULL,
    `observaciones` VARCHAR(191) NULL,
    `fechaPedido` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idEncabezadoCompra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Traslado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idBodegaOrigen` INTEGER NOT NULL,
    `idBodegaDestino` INTEGER NOT NULL,
    `idUsuario` INTEGER NULL,
    `idProducto` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `idEstado` INTEGER NOT NULL,
    `fechaRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Historial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idBodega` INTEGER NOT NULL,
    `idUsuarioRegistro` INTEGER NOT NULL,
    `idProducto` INTEGER NOT NULL,
    `justificacion` VARCHAR(191) NOT NULL,
    `fechaAjuste` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoriaToSubCategoria` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoriaToSubCategoria_AB_unique`(`A`, `B`),
    INDEX `_CategoriaToSubCategoria_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_idBodega_fkey` FOREIGN KEY (`idBodega`) REFERENCES `Bodega`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_idSubCategoria_fkey` FOREIGN KEY (`idSubCategoria`) REFERENCES `SubCategoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Foto` ADD CONSTRAINT `Foto_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bodega` ADD CONSTRAINT `Bodega_idUbicacion_fkey` FOREIGN KEY (`idUbicacion`) REFERENCES `Ubicacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventario` ADD CONSTRAINT `Inventario_idBodega_fkey` FOREIGN KEY (`idBodega`) REFERENCES `Bodega`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventario` ADD CONSTRAINT `Inventario_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventario` ADD CONSTRAINT `Inventario_idUsuarioRegistro_fkey` FOREIGN KEY (`idUsuarioRegistro`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventario` ADD CONSTRAINT `Inventario_idUsuarioActualizo_fkey` FOREIGN KEY (`idUsuarioActualizo`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proveedor` ADD CONSTRAINT `Proveedor_idUbicacion_fkey` FOREIGN KEY (`idUbicacion`) REFERENCES `Ubicacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EncabezadoCompra` ADD CONSTRAINT `EncabezadoCompra_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EncabezadoCompra` ADD CONSTRAINT `EncabezadoCompra_idProveedor_fkey` FOREIGN KEY (`idProveedor`) REFERENCES `Proveedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE `Traslado` ADD CONSTRAINT `Traslado_idBodegaOrigen_fkey` FOREIGN KEY (`idBodegaOrigen`) REFERENCES `Bodega`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Traslado` ADD CONSTRAINT `Traslado_idBodegaDestino_fkey` FOREIGN KEY (`idBodegaDestino`) REFERENCES `Bodega`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Traslado` ADD CONSTRAINT `Traslado_idEstado_fkey` FOREIGN KEY (`idEstado`) REFERENCES `Estado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Traslado` ADD CONSTRAINT `Traslado_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Traslado` ADD CONSTRAINT `Traslado_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historial` ADD CONSTRAINT `Historial_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historial` ADD CONSTRAINT `Historial_idBodega_fkey` FOREIGN KEY (`idBodega`) REFERENCES `Bodega`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historial` ADD CONSTRAINT `Historial_idUsuarioRegistro_fkey` FOREIGN KEY (`idUsuarioRegistro`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriaToSubCategoria` ADD CONSTRAINT `_CategoriaToSubCategoria_A_fkey` FOREIGN KEY (`A`) REFERENCES `Categoria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriaToSubCategoria` ADD CONSTRAINT `_CategoriaToSubCategoria_B_fkey` FOREIGN KEY (`B`) REFERENCES `SubCategoria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
