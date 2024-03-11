import { bodega } from "../../bodega/interfaces/bodega";
import { proveedor } from "../../proveedor/interfaces/proveedor";

export interface ubicacion {
    id: number;
    idProvincia: number;
    idCanton: number;
    idDistrito: number;
    direccionExacta?: string;
    bodega?: bodega[];
    proveedor?: proveedor[];
}