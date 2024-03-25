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
import { ProductoTablaComponent } from './components/producto-tabla/producto-tabla.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    ProdutoListaComponent,
    ProdutoDetalleComponent,
    ProdutoFormularioComponent,
    ProductoTablaComponent,
  ],
  imports: [
    CommonModule, 
    ProductoRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginator,
    MatGridListModule,
    MatChipsModule 

  ],
})
export class ProductoModule {}
