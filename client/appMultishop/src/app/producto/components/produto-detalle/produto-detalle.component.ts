import { Component} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HttpRequestService } from '../../../share/services/http-request.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produto-detalle',
  templateUrl: './produto-detalle.component.html',
  styleUrl: './produto-detalle.component.css'
})


  
export class ProdutoDetalleComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  //Elementos para obtener parametros
  constructor(private route: ActivatedRoute, private gService: HttpRequestService) {
    //obtener parametro de la url 
    let id = this.route.snapshot.paramMap.get('id'); // mismo nombre al que le puse en la ruta (routing module)

    if (!isNaN(Number(id))){
      this.obtenerProducto(Number(id))
    }
  }

  nombreCategoria: string;
  nombreSubCategoria: string;

  obtenerProducto(id: any) {
    this.gService
      .get('producto', id) // obtiene un dato en especifico
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data; // guarda el resultado al llamar la api
     

      });
  }
 
  ngOnDestroy() { 
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  
}

