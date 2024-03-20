import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HttpRequestService } from '../../share/services/http-request.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { inventario } from '../interfaces/inventario';

@Component({
  selector: 'app-inventario-lista',
  templateUrl: './inventario-lista.component.html',
  styleUrl: './inventario-lista.component.css',
})
export class InventarioListaComponent implements OnInit {
  datos!: inventario[]; //Respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<InventarioListaComponent>;
  dataSource = new MatTableDataSource<inventario>([]);

  //Para las Columnas
  displayedColumns = ['producto', 'minima', 'maxima', 'disponible'];

  constructor(private gService: HttpRequestService, private router: Router) {}

  ngOnInit(): void {
    this.listaInventario();
  }

  listaInventario() {
    this.gService
      .list('inventario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: inventario[]) => {
        console.log(data);
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
