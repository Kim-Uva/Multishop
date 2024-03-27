import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequestService } from '../../share/services/http-request.service';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-inventario-tabla',
  templateUrl: './inventario-tabla.component.html',
  styleUrl: './inventario-tabla.component.css'
})
export class InventarioTablaComponent implements AfterViewInit {


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private gService: HttpRequestService,
  ) {

  }
  datos: any
  destroy$: Subject<boolean> = new Subject<boolean>()

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['idBodega', 'idProducto', 'cantidadMinima', 'nombreProducto', 'cantidadMaxima', 'fechaRegistro'];




  ngAfterViewInit(): void {
    this.listaInventario()
  }


  listaInventario() {

    const arreglo = [
      {
        cantidadMaxima: 50,
        cantidadMinima: 10,
        fechaRegistro: "2024-03-20T05:57:26.629Z",
        idBodega: 1,
        idProducto: 2,
      },

      {

        cantidadMaxima: 75,
        cantidadMinima: 20,
        fechaRegistro: "2024-03-15T10:42:18.102Z",
        idBodega: 2,
        idProducto: 5,

      },
      {

        cantidadMaxima: 60,
        cantidadMinima: 15,
        fechaRegistro: "2024-03-18T08:22:47.534Z",
        idBodega: 3,
        idProducto: 8,

      },
      {

        cantidadMaxima: 100,
        cantidadMinima: 30,
        fechaRegistro: "2024-03-12T14:36:09.876Z",
        idBodega: 1,
        idProducto: 3,

      }
    ];
    this.gService.list('inventario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log(arreglo)
        this.datos = data
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      })
  }
}
