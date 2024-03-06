-- DropIndex
DROP INDEX `Usuario_correo_key` ON `usuario`;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `estado` BOOLEAN NOT NULL DEFAULT false;
