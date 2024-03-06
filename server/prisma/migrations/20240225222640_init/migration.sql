/*
  Warnings:

  - The primary key for the `bodegaproductos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idUsuario` on the `bodegaproductos` table. All the data in the column will be lost.
  - The values [Proveeedor] on the enum `Usuario_rol` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `idUsuario` to the `Bodega` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bodegaproductos` DROP FOREIGN KEY `BodegaProductos_idUsuario_fkey`;

-- AlterTable
ALTER TABLE `bodega` ADD COLUMN `idUsuario` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `bodegaproductos` DROP PRIMARY KEY,
    DROP COLUMN `idUsuario`,
    ADD PRIMARY KEY (`idBodega`, `idProducto`);

-- AlterTable
ALTER TABLE `usuario` MODIFY `rol` ENUM('Administrador', 'Encargado') NOT NULL;

-- AddForeignKey
ALTER TABLE `Bodega` ADD CONSTRAINT `Bodega_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
