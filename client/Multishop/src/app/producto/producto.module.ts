import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProdutoListaComponent } from './components/produto-lista/produto-lista.component';
import { ProdutoDetalleComponent } from './components/produto-detalle/produto-detalle.component';
import { ProdutoFormularioComponent } from './components/produto-formulario/produto-formulario.component';

@NgModule({
  declarations: [
    ProdutoListaComponent,
    ProdutoDetalleComponent,
    ProdutoFormularioComponent,
  ],
  imports: [CommonModule, ProductoRoutingModule],
})
export class ProductoModule {}
