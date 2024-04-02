import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioTablaComponent } from './inventario-tabla/inventario-tabla.component';
import { InventarioFormularioComponent } from './inventario-formulario/inventario-formulario.component';

const routes: Routes = [
  {
    path: 'inventario',
    children: [
      {
        path: 'tabla',
        component: InventarioTablaComponent,
      },
      {
        path: 'form',
        component: InventarioFormularioComponent,
      },
      {
        path: '',
        redirectTo: 'tabla',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
