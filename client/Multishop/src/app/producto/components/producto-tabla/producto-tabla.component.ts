import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequestService } from '../../../share/services/http-request.service';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificacionServiceService, TipoMessage } from '../../../share/services/notification-service.service';
import { CartService } from '../../../share/services/cart.service';

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

  displayedColumns = ['id','codigoProducto','nombre', 'descripcion','stock', 'categoria','acciones'];

  constructor(
    private fb: FormBuilder,
   private router:Router,
   private activeRouter: ActivatedRoute,
   private gService: HttpRequestService,
   private cartService: CartService,
   private notificacion: NotificacionServiceService


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
  actualizarProducto(id: number) {
    this.router.navigate(['/producto/update', id], {
      relativeTo: this.activeRouter,
    });
  }
  crearProducto() {
    this.router.navigate(['/producto/create'], {
      relativeTo: this.activeRouter,
    });
}

comprarProducto(id: number) {
  this.gService
    .get('producto', id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      //Agregar videojuego obtenido del API al carrito
      this.cartService.addToCart(data);
      //Notificar al usuario
      this.notificacion.mensaje(
        'Orden',
        'Producto: ' + data.nombre + ' agregado a la orden',
        TipoMessage.success
      );
    });
}
}