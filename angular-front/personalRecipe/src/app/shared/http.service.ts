import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe} from './application.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private address = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getRecipes$(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.address + '/recettes');
  }

  addRecipe$(recetteDTO: Recipe): Observable<void> {
    return this.http.post<void>(this.address + '/createRecette', recetteDTO);
  }

  updateRecipe$(recetteDTO: Recipe): Observable<void> {
    return this.http.post<void>(this.address + '/updateRecette', recetteDTO);
  }

  deleteRecipe$(id: number): Observable<void> {
    return this.http.get<void>(this.address + '/deleteRecette?id=' + id);
  }

}
