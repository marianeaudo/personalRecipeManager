import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe} from './application.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private address: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getRecipes$(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.address + '/recettes');
  }

  addRecipe$(recette: Recipe): Observable<void> {
    return this.http.post<void>(this.address + '/createRecette', recette);
  }

  deleteRecipe$(id: number): Observable<void> {
    return this.http.get<void>(this.address + '/deleteRecette?id=' + id);
  }

}
