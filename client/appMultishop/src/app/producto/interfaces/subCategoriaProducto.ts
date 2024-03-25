import { categoriaProducto } from "./categoriaProducto";
import { producto } from "./producto";

export interface subCategoriaProducto {
  id: number;
  nombre: string;
  producto?: producto[];
  categorias?: categoriaProducto[];
}
