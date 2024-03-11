import { producto } from "./producto";

export interface foto {
    id: number;
    idProducto: number;
    foto: Blob;
    producto?: producto;
}