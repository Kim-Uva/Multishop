import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoListaComponent } from './components/produto-lista/produto-lista.component';
import { ProdutoFormularioComponent } from './components/produto-formulario/produto-formulario.component';
import { ProdutoDetalleComponent } from './components/produto-detalle/produto-detalle.component';
import { ProductoTablaComponent } from './components/producto-tabla/producto-tabla.component';

const routes: Routes = [
  {
    path: 'producto',
    children: [
      {
        path: 'lista',
        component: ProdutoListaComponent,
      },
      {
        path: 'tabla',
        component: ProductoTablaComponent,
      },
      {
        path: 'create',
        component: ProdutoFormularioComponent
      },
      {
        path: ':id',
        component: ProdutoDetalleComponent,
      },
      {
        path: 'update/:id',
        component: ProdutoFormularioComponent
      },
      {
        path: '',
        redirectTo: 'lista',
        pathMatch: 'full',
      },

    ],
  },
  { path: 'producto/create', component: ProdutoFormularioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoRoutingModule { }
