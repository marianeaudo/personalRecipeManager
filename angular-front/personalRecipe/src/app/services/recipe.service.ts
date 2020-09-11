import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Recipe } from '../shared/application.model';
import { UIService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipes: Recipe[] = [];
  recipesSubscription: Subscription;
  recipesSubject = new Subject<Recipe[]>();

  constructor(private http: HttpClient, private uIService: UIService) { }

  getRecipes(): void {
    this.recipesSubscription = this.http.get('http://localhost:8080/recettes').subscribe(
     (recipes: Recipe[]) => {
       this.recipes = recipes;
       this.recipes.sort((a, b) => {
        return (a.nom > b.nom) ? 1 : (a.nom < b.nom) ? -1 : 0;
      });
       this.recipesSubject.next([...this.recipes]);
     },
     (error) => {
      this.uIService.showSnackbar(
        'Une erreur est survenue, veuillez réessayer.'
      );
     }
    );
  }
}
