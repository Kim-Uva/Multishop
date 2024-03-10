import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { UbicacionComponent } from './ubicacion/ubicacion.component';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    UbicacionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatGridListModule
  ]
})
export class ShareModule { }
