import { bodega } from '../../bodega/interfaces/bodega';
import { inventario } from '../../inventario/interfaces/inventario';
import { encabezadoCompra } from '../../orden-compra/interfaces/encabezadoCompra';

export interface usuario {
  id: number;
  nombre: string;
  apellidos: string;
  correo: string;
  contrasenna: string;
  fechaRegistro: Date;
  rol: string;
  idBodega: number;
  estado: boolean;
  encabezadoCompras?: encabezadoCompra[];
  invUsuarioRegistro?: inventario[];
  invUsuarioActualizo?: inventario[];
  bodega?: bodega;
}
