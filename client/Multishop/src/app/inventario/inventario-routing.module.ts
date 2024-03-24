import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioListaComponent } from './inventario-lista/inventario-lista.component';

const routes: Routes = [

  {
    path:'inventario', 
    component: InventarioListaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
1