import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service'
import { HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { IResponse } from '../../interfaces/IResponse'

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpService) { }
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = environment.apiKey

  getMovies(): Observable<IResponse> {
    const params = new HttpParams().set('api_key', this.apiKey);
    return this.http.get<IResponse>(`${this.apiUrl}/movie/popular`,  params);
  }
}
