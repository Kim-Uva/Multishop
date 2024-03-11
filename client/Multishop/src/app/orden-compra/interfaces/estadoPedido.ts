import { pedido } from "./pedido";

export interface estadoPedido {
  id: number;
  estado: string;
  pedidos?: pedido[];
}
