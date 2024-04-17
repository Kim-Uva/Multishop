import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from '../../share/services/cart.service';
import { NotificacionServiceService, TipoMessage } from '../../share/services/notification-service.service';
import { HttpRequestService } from '../../share/services/http-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-tabla',
  templateUrl: './detalle-tabla.component.html',
  styleUrl: './detalle-tabla.component.css'
})
export class DetalleTablaComponent implements OnInit {
  total = 0;
  fecha = Date.now();
  qtyItems = 0;
  //Tabla
  displayedColumns: string[] = [
    'producto',
    'precio',
    'cantidad',
    'subtotal',
    'acciones',
  ];
  dataSource = new MatTableDataSource<any>();
  constructor(
    private cartService: CartService,
    private noti: NotificacionServiceService,
    private gService: HttpRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.currentDataCart$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.total = this.cartService.getTotal();
  }
  actualizarCantidad(item: any) {
    this.cartService.addToCart(item);
    this.total = this.cartService.getTotal();
    /*  this.noti.mensaje('Orden',
    'Cantidad actualizada: '+item.cantidad,
    TipoMessage.info) */
  }
  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total = this.cartService.getTotal();
    this.noti.mensaje('Orden', 'Producto eliminado', TipoMessage.warning);
  }
  registrarOrden() {
    if (this.cartService.getItems != null) {
      //Obtener los items del carrito de compras
      let itemsCarrito = this.cartService.getItems;
      //Armar la estructura de la tabla intermedia
      //[{'videojuegoId':valor, 'cantidad':valor}]
      
      let detalles = itemsCarrito.map((x) => ({
        ['idProducto']: x.idItem,
        ['cantidad']: x.cantidad,
        ['precio']: x.precio,

      }));
      //Datos para el API
      let infoOrden = {
        fechaOrden: new Date(this.fecha),
        detalleCompra: detalles,
      };
      
      this.gService.create('/orden', infoOrden).subscribe((respuesta: any) => {
        this.noti.mensaje(
          'Orden',
          'Orden registrada #' + respuesta.id,
          TipoMessage.success
        );
        this.cartService.deleteCart();
        this.total = this.cartService.getTotal();
        console.log(respuesta);
      });
    } else {
      this.noti.mensaje(
        'Orden',
        'Agregue Productos a la orden',
        TipoMessage.warning
      );
    }
  }
}
