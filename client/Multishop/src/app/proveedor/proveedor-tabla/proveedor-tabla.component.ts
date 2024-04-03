import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HttpRequestService } from '../../share/services/http-request.service';

@Component({
  selector: 'app-proveedor-tabla',
  templateUrl: './proveedor-tabla.component.html',
  styleUrl: './proveedor-tabla.component.css'
})
export class ProveedorTablaComponent implements AfterViewInit {


  datos: any
  destroy$: Subject<boolean>=new Subject<boolean>()
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['id','identificacion','nombreProveedor', 'correoElectronico', 'acciones'];

  constructor(
    private fb: FormBuilder,
   private router:Router,
   private activeRouter: ActivatedRoute,
   private gService: HttpRequestService,
  ) {
 
  }

  
  ngAfterViewInit(): void {
    this.listaProveedores()
  }


  listaProveedores(){
    this.gService.list('proveedor')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data)=>{
        console.log(data)
        this.datos=data
        this.dataSource = new MatTableDataSource(this.datos)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      })
  }
  actualizarProveedor(id: number) {
    this.router.navigate(['/proveedor/update', id], {
      relativeTo: this.activeRouter,
    });
  }
  crearProveedor() {
    this.router.navigate(['/proveedor/create'], {
      relativeTo: this.activeRouter,
    });
}


}