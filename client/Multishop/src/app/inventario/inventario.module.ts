import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioRoutingModule } from './inventario-routing.module';
import { InventarioListaComponent } from './inventario-lista/inventario-lista.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    InventarioListaComponent
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    MatTableModule
  ]
})
export class InventarioModule { }
