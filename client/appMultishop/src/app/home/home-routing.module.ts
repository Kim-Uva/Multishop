import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InventarioListaComponent } from '../inventario/inventario-lista/inventario-lista.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'inventario', component: InventarioListaComponent} 

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
