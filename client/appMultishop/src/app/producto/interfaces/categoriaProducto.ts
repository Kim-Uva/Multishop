import { producto } from "./producto";
import { subCategoriaProducto } from "./subCategoriaProducto";

export interface categoriaProducto {
  id: number;
  nombre: string;
  subCategoria?: subCategoriaProducto[];
  producto?: producto[];
}
