import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioRoutingModule } from './inventario-routing.module';
import { MatTableModule } from '@angular/material/table';
import { InventarioTablaComponent } from './inventario-tabla/inventario-tabla.component';
import { ProductoRoutingModule } from '../producto/producto-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [
    InventarioTablaComponent,
    InventarioTablaComponent
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

  ]
})
export class InventarioModule { }
