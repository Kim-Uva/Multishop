import { encabezadoCompra } from "../../orden-compra/interfaces/encabezadoCompra";
import { ubicacion } from "../../share/interfaces/ubicacion";

export interface proveedor {
  id: number;
  identificacion: string;
  nombreProveedor: string;
  idUbicacion: number;
  correoElectronico: string;
  telefono: number;
  encabezadoCompra?: encabezadoCompra[];
  ubicacion?: ubicacion;
}
