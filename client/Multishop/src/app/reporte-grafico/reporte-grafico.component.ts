import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto'
import { HttpRequestService } from '../share/services/http-request.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reporte-grafico',
  templateUrl: './reporte-grafico.component.html',
  styleUrl: './reporte-grafico.component.css'
})
export class ReporteGraficoComponent implements OnInit {

  constructor(private httpRequest: HttpRequestService, private router: Router,) {
  }
  hoy = new Date();
  title = ("Grafico de Productos" + this.hoy.getDate() + this.hoy.getMonth() + this.hoy.getFullYear() + this.hoy.getTime());


  public chart: Chart;
  ngOnInit(): void {
    const data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [{
        label: 'Reporte de productos agregados',
        data: [65, 59, 80, 81, 56, 55, 40, 10, 12, 32, 12, 32],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
          'rgba(220, 53, 69, 0.2)',
          'rgba(255, 127, 14, 0.2)',
          'rgba(221, 160, 221, 0.2)',
          'rgba(137, 54, 177, 0.2)', 'rgba(105, 105, 105, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };

    // Creamos la gráfica
    this.chart = new Chart("chart", {
      type: 'bar' as ChartType, // tipo de la gráfica 
      data: data, // datos 
      options: { // opciones de la gráfica 
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
  }
  descargar() {
    html2canvas(document.body).then(canvas => {
      const contentDataURL = canvas.toDataURL('imagen/png')
      let pdf = new jsPDF('p', 'px', 'a4');
      var width = pdf.internal.pageSize.getHeight();
      var height = canvas.height * width / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 450, 250)
      pdf.save(this.title + '.pdf');


    })
  }



}
