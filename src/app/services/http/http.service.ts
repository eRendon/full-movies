import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  private apiKey = environment.apiKey
  get<T>(url: string): Observable<T> {
    const params = new HttpParams().set('api_key', this.apiKey);
    return this.http.get<T>(url, { params })
  }
}
