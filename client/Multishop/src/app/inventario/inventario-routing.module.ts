import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioTablaComponent } from './inventario-tabla/inventario-tabla.component';

const routes: Routes = [
  {
    path: 'inventario',
    children: [
      {
        path: 'tabla',
        component: InventarioTablaComponent,
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
