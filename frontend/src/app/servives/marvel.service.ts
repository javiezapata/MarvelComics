import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

const URL_API = environment.apiMarvel;
const KEY_PLUBLIC = environment.public_key;
const HASH = environment.hash;

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  private apiUrl = 'http://localhost:3000';  

  constructor(private http:HttpClient) { }

  getComics():Observable<any>{
    return this.http.get<any>(`${URL_API}/comics?ts=1&apikey=${KEY_PLUBLIC}&hash=${HASH}`).pipe(map((data:any)=>data.data.results));
  }


  getComic(id: string):Observable<any>{
    return this.http.get(`${URL_API}/comics/${id}?ts=1&apikey=${KEY_PLUBLIC}&hash=${HASH}`).pipe(map((data:any)=>data.data.results));
  }


  addFavorite(comicId: number): Observable<any> {
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.apiUrl}/favorites/${comicId}`, {}, { headers });
  }

  // Eliminar un comic de la lista de favoritos
  removeFavorite(comicId: string): Observable<any> {
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.apiUrl}/favorites/${comicId}`, { headers });
  }

  getFavorites(): Observable<any> {
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/favorites`, { headers });
  }
}
