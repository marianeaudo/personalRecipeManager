import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './application.model';
import { UIService } from './ui.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipes: Recipe[] = [];
  recipesSubject = new Subject<Recipe[]>();

  selectedRecipe: Recipe;
  selectedRecipeSubject = new Subject<Recipe>();

  isSelectedRecipeSubject = new Subject<boolean>();
  isLoadingSubject = new Subject<boolean>();

  constructor(private http: HttpClient, private uIService: UIService) {}

  getRecipes(): void {
    this.http.get('http://localhost:8080/recettes').subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
        this.recipes.sort((a, b) => {
          return a.nom > b.nom ? 1 : a.nom < b.nom ? -1 : 0;
        });
        this.recipesSubject.next([...this.recipes]);
        this.isLoadingSubject.next(true);
      },
      (error) => {
        this.uIService.showSnackbar(
          'Une erreur est survenue, veuillez réessayer.'
        );
        this.isLoadingSubject.next(false);
      }
    );
  }

  setSelectedRecipe(recipe: Recipe): void {
    this.selectedRecipe = recipe;
    this.selectedRecipeSubject.next({ ...this.selectedRecipe });
    this.isSelectedRecipeSubject.next(true);
  }

  deleteRecipe(recipe: Recipe): void {
    this.http
      .get('http://localhost:8080/deleteRecette?id=' + recipe.id)
      .subscribe(
        () => {
          this.getRecipes();
          this.setSelectedRecipe(null);
          this.isSelectedRecipeSubject.next(false);
        },
        (error) => {
          this.uIService.showSnackbar(
            'Une erreur est survenue, veuillez réessayer.'
          );
        }
      );
  }
}
