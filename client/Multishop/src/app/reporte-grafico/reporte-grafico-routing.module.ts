import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteGraficoComponent } from './reporte-grafico.component';



const routes: Routes = [
  {
    path: 'reporteGrafico',
    children: [
      {
        path: 'reporte',
        component: ReporteGraficoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteGraficoRoutingModule { }

