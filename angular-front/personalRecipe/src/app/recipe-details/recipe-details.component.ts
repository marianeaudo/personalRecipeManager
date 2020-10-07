import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from '../shared/recipe.service';
import { Recipe } from '../shared/application.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {

  selectedRecipe: Recipe;
  selectedRecipeSubscription: Subscription;
  isSelectedRecipe: boolean;
  isSelectedRecipeSubscription: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.selectedRecipeSubscription = this.recipeService.selectedRecipeSubject.subscribe(
      (recipe: Recipe) => {
        this.selectedRecipe = recipe;
      }
    );
    this.isSelectedRecipeSubscription = this.recipeService.isSelectedRecipeSubject.subscribe(
      (isSelected: boolean) => {
        this.isSelectedRecipe = isSelected;
      }
    );
  }

  onDeleteRecipe(recipe: Recipe): void {
    this.recipeService.deleteRecipe(recipe);
  }

  ngOnDestroy(): void {
    this.selectedRecipeSubscription.unsubscribe();
    this.isSelectedRecipeSubscription.unsubscribe();
  }

}
