import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedorTablaComponent } from './proveedor-tabla/proveedor-tabla.component';
import { ProveedorFormularioComponent } from './proveedor-formulario/proveedor-formulario.component';

const routes: Routes = [
  {
    path: 'proveedor',
    children: [
      {
        path: 'tabla',
        component: ProveedorTablaComponent,
      },
 
      {
        path: 'create',
        component: ProveedorFormularioComponent,
      },
 
      {
        path: 'update/:id',
        component: ProveedorFormularioComponent
      },
      {
        path: '',
        redirectTo: 'tabla',
        pathMatch: 'full',
      },
 

    ],
  },
  { path: 'proveedor/create', component: ProveedorFormularioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedorRoutingModule { }
