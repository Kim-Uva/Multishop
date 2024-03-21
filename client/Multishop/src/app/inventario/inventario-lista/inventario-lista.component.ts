import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HttpRequestService } from '../../share/services/http-request.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-inventario-lista',
  templateUrl: './inventario-lista.component.html',
  styleUrl: './inventario-lista.component.css'
})
export class InventarioListaComponent implements AfterViewInit {


  datos: any //Respuesta del API
  destroy$:Subject<boolean>=new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['nombre'];

  constructor(private gService: HttpRequestService, 
    private router: Router
     ){

    
      }
      ngAfterViewInit():void{
        this.listaInventario()
   }
 

   listaInventario(){ 
    this.gService.list('inventario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data)=>{
        console.log(data)
        this.datos=data
        this.dataSource = new MatTableDataSource(this.datos)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
  }



  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
