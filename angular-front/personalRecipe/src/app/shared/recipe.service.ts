import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './application.model';
import { UIService } from './ui.service';
import { HttpService } from './http.service';

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

  constructor(
    private uIService: UIService,
    private httpService: HttpService
  ) {}

  getRecipes(): void {
    this.httpService.getRecipes$().subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
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

  createRecipe(recipe: Recipe): void {
    this.httpService.addRecipe$(recipe).subscribe(
      () => {
        this.uIService.showSnackbar('La recette a bien été ajoutée.');
      },
      (error) => {
        this.uIService.showSnackbar(
          'Une erreur est survenue, veuillez réessayer.'
        );
      }
    );
  }

  deleteRecipe(id: number): void {
    this.httpService.deleteRecipe$(id).subscribe(
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
