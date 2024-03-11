import { inventario } from '../../inventario/interfaces/inventario';
import { detalleCompra } from '../../orden-compra/interfaces/detalleCompra';
import { ubicacion } from '../../share/interfaces/ubicacion';
import { usuario } from '../../share/interfaces/usuario';

export interface bodega {
  id: number;
  nombre: string;
  idUbicacion: number;
  ubicacion: ubicacion;
  tamanno: number;
  capacidad: number;
  seguridad: boolean;
  usuario: usuario[];
  inventario: inventario[];
  detalleCompra: detalleCompra;
}
