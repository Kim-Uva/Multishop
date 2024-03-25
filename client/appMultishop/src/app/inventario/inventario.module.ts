import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { InventarioRoutingModule } from './inventario-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
  ]
})
export class InventarioModule { }
