import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProdutoListaComponent } from './components/produto-lista/produto-lista.component';
import { ProdutoDetalleComponent } from './components/produto-detalle/produto-detalle.component';
import { ProdutoFormularioComponent } from './components/produto-formulario/produto-formulario.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    ProdutoListaComponent,
    ProdutoDetalleComponent,
    ProdutoFormularioComponent,
  ],
  imports: [
    CommonModule, 
    ProductoRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatChipsModule 

  ],
})
export class ProductoModule {}
