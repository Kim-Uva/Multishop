import { categoriaProducto } from "./categoriaProducto";
import { foto } from "./foto";
import { subCategoriaProducto } from "./subCategoriaProducto";

export interface producto {
  id: number;
  codigoProducto: string;
  nombre: string;
  descripcion: string;
  stock: string;
  precio: number;
  estadoProducto: boolean;
  idCategoria: number;
  categoria?: categoriaProducto;
  idSubcategoria: number;
  subCategorias?: subCategoriaProducto;
  foto?: foto[];
}
