import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../../../share/services/http-request.service';
import { producto } from '../../interfaces/producto';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrl: './produto-lista.component.css'
})
export class ProdutoListaComponent implements OnInit {

  productos!: producto[];
  isLoading: boolean = false;

  constructor(private httpRequest: HttpRequestService) {
  }

  ngOnInit(): void {
      this.cargarProductos();
  }

  cargarProductos(): void {
    this.isLoading = true;
    this.httpRequest.list<producto[]>('producto').subscribe((productos) => {
      this.productos = productos;
      this.isLoading = false;
    }) //desde la ruta del backend
  }

}
