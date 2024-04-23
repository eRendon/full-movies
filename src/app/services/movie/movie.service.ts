import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service'
import { BehaviorSubject, Observable } from 'rxjs'
import { IResponse } from '../../interfaces/IResponse'
import { IMovieDetail } from '../../interfaces/Movie/IMovieDetail'
import { ICreditsResponse } from '../../interfaces/Movie/ICredits'
import { IMediaResponse } from '../../interfaces/Movie/IMedia'
import { IMovie } from '../../interfaces/IMovie'
import { IKeyWordResponse } from '../../interfaces/Movie/IKeyWord'

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movies: BehaviorSubject<IMovie[]> = new BehaviorSubject<IMovie[]>([])
  page: number = 1
  constructor(private http: HttpService) { }
  private apiUrl = 'https://api.themoviedb.org/3';


  getMovies(): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.apiUrl}/movie/popular?page=${this.page}&language=es-ES`);
  }

  getById(id: number): Observable<IMovieDetail> {
    return this.http.get<IMovieDetail>(`${this.apiUrl}/movie/${id}?language=es-ES`);
  }

  getCredits(id: number): Observable<ICreditsResponse> {
    return this.http.get<ICreditsResponse>(`${this.apiUrl}/movie/${id}/credits?language=es-ES`);
  }

  getBackdrops(id: string): Observable<IMediaResponse> {
    return this.http.get<IMediaResponse>(`${this.apiUrl}/movie/${id}/images`);
  }

  searchMovies(query: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.apiUrl}/search/movie?query=${query}&page=${this.page}&language=es-ES`);
  }

  getKeyWords(id: string): Observable<IKeyWordResponse> {
    const url = 'https://api.themoviedb.org/3/movie/1011985/keywords';
    return this.http.get<IKeyWordResponse>(`${this.apiUrl}/movie/${id}/keywords?language=es-ES`);
  }

  setCurrentPage(page: number): void {
    this.page = page
  }
}
