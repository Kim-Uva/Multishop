import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../../../share/services/http-request.service';
import { producto } from '../../interfaces/producto';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrl: './produto-lista.component.css'
})
export class ProdutoListaComponent implements OnInit{

  
  isLoading: boolean = false;

  productos:any
  destroy$:Subject<boolean>=new Subject<boolean>();

  constructor(private httpRequest: HttpRequestService, private router: Router) {
  }

  ngOnInit(): void {
      this.cargarProductos();
  }

  cargarProductos(): void {
    this.isLoading = true;
    
    this.httpRequest.list('producto/').pipe(takeUntil(this.destroy$))
    .subscribe((data)=>{
      console.log(data)
      
      this.productos=data
      this.isLoading = false;
    }) //desde la ruta del backend
  }

  detalleProducto(id:number): void{

    this.router.navigate(['producto', id])
     
  }

  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
 }
