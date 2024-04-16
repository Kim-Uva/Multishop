import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdenCompraRoutingModule } from './orden-compra-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalleTablaComponent } from './detalle-tabla/detalle-tabla.component';


@NgModule({
  declarations: [
DetalleTablaComponent
  ],
  imports: [
    CommonModule,
    OrdenCompraRoutingModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatGridListModule,
    MatDividerModule,
    FormsModule, 
    ReactiveFormsModule,
  ]
})
export class OrdenCompraModule { }
