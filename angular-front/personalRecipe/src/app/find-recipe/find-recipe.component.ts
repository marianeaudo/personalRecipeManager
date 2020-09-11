import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../shared/application.model';
import { ApplicationService } from '../shared/application.service';

@Component({
  selector: 'app-find-recipe',
  templateUrl: './find-recipe.component.html',
  styleUrls: ['./find-recipe.component.scss']
})
export class FindRecipeComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  recipesSubscription: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipesSubscription = this.recipeService.recipesSubject.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }

}
