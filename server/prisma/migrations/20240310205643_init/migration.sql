-- DropForeignKey
ALTER TABLE `inventario` DROP FOREIGN KEY `Inventario_idUsuarioActualizo_fkey`;

-- AlterTable
ALTER TABLE `inventario` MODIFY `idUsuarioActualizo` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Inventario` ADD CONSTRAINT `Inventario_idUsuarioActualizo_fkey` FOREIGN KEY (`idUsuarioActualizo`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
