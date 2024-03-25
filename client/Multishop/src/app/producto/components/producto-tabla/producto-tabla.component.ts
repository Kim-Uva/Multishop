import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequestService } from '../../../share/services/http-request.service';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-producto-tabla',
  templateUrl: './producto-tabla.component.html',
  styleUrl: './producto-tabla.component.css'
})
export class ProductoTablaComponent implements AfterViewInit {


  datos: any
  destroy$: Subject<boolean>=new Subject<boolean>()
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['id','codigoProducto','nombre', 'descripcion','stock'];

  constructor(
    private fb: FormBuilder,
   private router:Router,
   private activeRouter: ActivatedRoute,
   private gService: HttpRequestService,
  ) {
 
  }

  
  ngAfterViewInit(): void {
    this.listaProductos()
  }


  listaProductos(){
    this.gService.list('producto/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data)=>{
        console.log(data)
        this.datos=data
        this.dataSource = new MatTableDataSource(this.datos)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      })
  }
}
