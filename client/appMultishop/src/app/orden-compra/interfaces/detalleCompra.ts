import { producto } from "../../producto/interfaces/producto";
import { encabezadoCompra } from "./encabezadoCompra";

export interface detalleCompra {
  id: number;
  idEncabezadoCompra: number;
  idProducto: number;
  idBodega: number;
  cantidad: number;
  producto?: producto;
  encabezadoCompra?: encabezadoCompra;
}
