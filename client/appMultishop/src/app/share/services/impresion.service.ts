import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";

import autoTable from 'jspdf-autotable'
@Injectable({
  providedIn: 'root'
})
export class ImpresionService {

  constructor() { }


  imprimir(encabezado: string[], cuerpo: Array<any>, titulo: string, guardar?: boolean) {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: 'letter'
    });
    
    const productos = cuerpo.map(prod => {
      return [
        prod.id,
        prod.nombre,
        prod.descripcion,
        prod.precio,
        prod.categoria.nombre,
        prod.subCategorias.nombre
      ]
    });

    doc.text(titulo, doc.internal.pageSize.width / 2, 25, { align: 'center' });
    autoTable(doc, {
      head: [encabezado],
      body: productos,
    })

    if (guardar) {
      const hoy = new Date();
      doc.save(hoy.getDate() + hoy.getMonth() + hoy.getFullYear() + hoy.getTime() + '.pdf')
    }
  }

  imprimirListado(cuerpo: Array<any>, titulo: string, guardar?: boolean) {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: 'letter'
    });
    const productos = cuerpo.map(prod => {
      return [
        prod.nombre + "  " + prod.descripcion,

      ]
    });

    doc.text(titulo, doc.internal.pageSize.width / 2, 25, { align: 'center' });
    autoTable(doc, {

      body: productos,
    })

    if (guardar) {
      const hoy = new Date();
      doc.save(hoy.getDate() + hoy.getMonth() + hoy.getFullYear() + hoy.getTime() + '.pdf')
    } 

}
}

