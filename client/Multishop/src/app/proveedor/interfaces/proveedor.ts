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
