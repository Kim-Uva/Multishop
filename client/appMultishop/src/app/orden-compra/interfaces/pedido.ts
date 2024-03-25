import { encabezadoCompra } from "./encabezadoCompra";
import { estadoPedido } from "./estadoPedido";

export interface pedido {
  idEncabezadoCompra: number;
  idEstado: number;
  observaciones?: string;
  fechaPedido: Date;
  estadoPedido?: estadoPedido;
  encabezadoCompra?: encabezadoCompra;
}
