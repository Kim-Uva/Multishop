import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../../../share/services/http-request.service';
import { producto } from '../../interfaces/producto';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ImpresionService } from '../../../share/services/impresion.service';
import { NotificacionServiceService, TipoMessage } from '../../../share/services/notification-service.service';
import { CartService } from '../../../share/services/cart.service';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrl: './produto-lista.component.css'
})
export class ProdutoListaComponent implements OnInit {


  isLoading: boolean = false;

  productos: any
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private httpRequest: HttpRequestService, 
    private router: Router, 
    private ImpresionService: ImpresionService,
  private notificacion: NotificacionServiceService,
private cartService: CartService ) {
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.isLoading = true;

    this.httpRequest.list('producto/').pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log(data)

        this.productos = data
        this.isLoading = false;
      }) //desde la ruta del backend
  }

  cargarProductosCategoria(): void {
    this.isLoading = true;

    this.httpRequest.list('producto/').pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log(data)

        this.productos = data
        this.isLoading = false;
      }) //desde la ruta del backend
  }
  detalleProducto(id: number): void {

    this.router.navigate(['producto', id])

  }

  comprar(id: number) {
    this.httpRequest
      .get('producto/', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Agregar videojuego obtenido del API al carrito
        this.cartService.addToCart(data);
        //Notificar al usuario
        this.notificacion.mensaje(
          'producto',
          'Producto: ' + data.nombre + ' agregado a la orden',
          TipoMessage.success
        );
      });
  }
  onImprimir() {
    const encabezado = ["Id Producto", "Nombre", "Descripcion", "Precio", "Categoria", "SubCategoria"]
    const cuerpo = this.productos;
    console.log(cuerpo[1].subCategorias.nombre);
    this.ImpresionService.imprimir(encabezado, cuerpo, "Tabla de productos", true);
  }
  onImprimirListado() {
    const cuerpo = this.productos;
    console.log(cuerpo);
    this.ImpresionService.imprimirListado(cuerpo, "Listado de productos", true);
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
