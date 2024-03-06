import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrl: './ubicacion.component.css'
})

@Injectable({
  providedIn: 'root',
})

export class UbicacionComponent {
  public baseUrl: string = 'https://ubicaciones.paginasweb.cr/';

  constructor(private http: HttpClient) {}

  getProvincias(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'provincias.json');
  }

  getCantonByPronvicia(idProvincia: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}provincia/${idProvincia}/cantones.json`
      );
  }

  getDistritoByCantonYProvincia(
    idProvincia: number,
    idCanton: number
  ): Observable<any> {
    return this.http.get<any>(
      this.baseUrl +
      `${this.baseUrl}provincia/${idProvincia}/canton/${idCanton}/distritos.json`
      );
  }
}