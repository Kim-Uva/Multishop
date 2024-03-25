import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  base_url: string = environment.BASE_URL;

  constructor(private http: HttpClient) {
  }

  
  list<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.base_url}/${endpoint}`);
  }

  get<T>(endpoint: string, filtro: number): Observable<T> {
    return this.http.get<T>(`${this.base_url}/${endpoint}/${filtro}`);
  }

  // create () {

  // }

  // update () {

  // }
}
