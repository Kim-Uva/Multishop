import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleTablaComponent } from './detalle-tabla/detalle-tabla.component';

const routes: Routes = [
{  
        path: 'orden',
        component: DetalleTablaComponent,
 
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenCompraRoutingModule { }
