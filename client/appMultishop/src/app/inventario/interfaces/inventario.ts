import { bodega } from '../../bodega/interfaces/bodega';
import { producto } from '../../producto/interfaces/producto';
import { usuario } from '../../share/interfaces/usuario';

export interface inventario {
  idBodega: number;
  bodegas?: bodega;
  idProducto: number;
  producto?: producto;
  idUsuarioRegistro: number;
  usuarioRegistro?: usuario;
  idUsuarioActualizo: number;
  usuarioActualizo?: usuario;
  cantidad: number;
  cantidadMinima: number;
  cantidadMaxima: number;
  fechaRegistro: Date;
}
