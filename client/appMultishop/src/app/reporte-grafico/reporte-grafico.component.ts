import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto'
import { HttpRequestService } from '../share/services/http-request.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-reporte-grafico',
  templateUrl: './reporte-grafico.component.html',
  styleUrl: './reporte-grafico.component.css'
})
export class ReporteGraficoComponent implements OnInit {

  datos: any;
  datosGrafico: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private httpRequest: HttpRequestService, private router: Router,) {
  }
  hoy = new Date();
  title = ("Grafico de Clientes Registrados" + this.hoy.getDate() + this.hoy.getMonth() + this.hoy.getFullYear() + this.hoy.getTime());


  public chart: Chart;
  ngOnInit(): void {


    this.httpRequest.list('usuario').pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.datos = data
      this.datos.forEach(dato => {
        let valor = this.getMonthFromDateString(dato.fechaRegistro)

        switch (valor) {

          case 1:
            this.datosGrafico[0] += 1
            break;
          case 2:
            this.datosGrafico[1] += 1
            break;
          case 3:
            this.datosGrafico[2] += 1
            break;
          case 4:
            this.datosGrafico[3] += 1
            break;
          case 5:
            this.datosGrafico[4] += 1
            break;
          case 6:
            this.datosGrafico[5] += 1
            break;
          case 7:
            this.datosGrafico[6] += 1
            break;
          case 8:
            this.datosGrafico[7] += 1
            break;
          case 9:
            this.datosGrafico[8] += 1
            break;
          case 10:
            this.datosGrafico[9] += 1
            break;
          case 11:
            this.datosGrafico[10] += 1
            break;
          case 12:
            this.datosGrafico[11] += 1
            break;

        }

      });
    })

    // Recorrer arreglo

    console.log(this.datosGrafico)

    const data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [{
        label: 'Grafico de Clientes Registrados',
        data: this.datosGrafico,
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
  getMonthFromDateString(dateString) {
    const dateParts = dateString.split('-');
    return parseInt(dateParts[1]);
  }


  descargar() {
    html2canvas(document.body).then(canvas => {
      const contentDataURL = canvas.toDataURL('imagen/png')
      let pdf = new jsPDF('p', 'px', 'a4');

      pdf.addImage(contentDataURL, 'PNG', 0, 0, 450, 250)
      pdf.save(this.title + '.pdf');


    })
  }



}
