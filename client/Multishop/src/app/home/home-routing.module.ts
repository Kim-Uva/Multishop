import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InventarioListaComponent } from '../inventario/inventario-lista/inventario-lista.component';
import { ProductoTablaComponent } from '../producto/components/producto-tabla/producto-tabla.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'inventario', component: InventarioListaComponent} ,
  {path:'tablaProducto', component: ProductoTablaComponent} 

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
