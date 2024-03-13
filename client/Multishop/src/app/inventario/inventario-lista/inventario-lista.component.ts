import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HttpRequestService } from '../../share/services/http-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario-lista',
  templateUrl: './inventario-lista.component.html',
  styleUrl: './inventario-lista.component.css'
})
export class InventarioListaComponent {


  datos: any //Respuesta del API
  destroy$:Subject<boolean>=new Subject<boolean>();

  constructor(private gService: HttpRequestService, 
    private router: Router
     ){

      this.listaInventario()
   }


   listaInventario(){
    this.gService.list('inventario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data)=>{
        console.log(data)
        this.datos=data
      })
  }



  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
