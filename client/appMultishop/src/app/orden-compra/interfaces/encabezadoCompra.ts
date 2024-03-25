import { proveedor } from '../../proveedor/interfaces/proveedor';
import { usuario } from '../../share/interfaces/usuario';
import { detalleCompra } from './detalleCompra';
import { pedido } from './pedido';

export interface encabezadoCompra {
  id: number;
  fechaCompra: Date;
  idProveedor: number;
  idUsuario: number;
  usuario?: usuario;
  proveedor?: proveedor;
  detalleCompra?: detalleCompra[];
  pedido?: pedido[];
}
