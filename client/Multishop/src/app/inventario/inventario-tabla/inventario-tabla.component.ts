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

  displayedColumns = ['idBodega', 'idProducto', 'cantidadMinima', 'nombreProducto', 'cantidadMaxima', 'fechaRegistro', 'acciones'];




  ngAfterViewInit(): void {
    this.listaInventario()
  }


  listaInventario() {

    this.gService.list('inventario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.datos = data
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      })
  }

  actualizarProducto(id: number) {
    this.router.navigate(['/producto/update', id], {
      relativeTo: this.activeRouter,
    });
  }
  crearProducto() {
    this.router.navigate(['/inventario/form'], {
      relativeTo: this.activeRouter,
    });
  }
}
