import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InventarioTablaComponent } from '../inventario/inventario-tabla/inventario-tabla.component';
import { ProductoTablaComponent } from '../producto/components/producto-tabla/producto-tabla.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inventario', component: InventarioTablaComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
