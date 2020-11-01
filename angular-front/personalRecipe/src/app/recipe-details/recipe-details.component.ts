import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from '../shared/recipe.service';
import { Recipe } from '../shared/application.model';
import { ApplicationService } from '../shared/application.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private recipeService: RecipeService,
    private applicationService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedRecipeSubscription = this.recipeService.selectedRecipeSubject.subscribe(
      (recipe: Recipe) => {
        this.selectedRecipe = recipe;
        if (this.selectedRecipe.instructions) {
        this.selectedRecipe.instructions.sort((a, b) => {
          return a.ordre - b.ordre;
        });
      }
      }
    );
    this.isSelectedRecipeSubscription = this.recipeService.isSelectedRecipeSubject.subscribe(
      (isSelected: boolean) => {
        this.isSelectedRecipe = isSelected;
      }
    );
  }

  onUpdateRecipe(): void {
    this.applicationService.setEditMode(true);
    this.router.navigate(['../ajout'], { relativeTo: this.route });
  }

  getPathPhoto(recette: Recipe): String {
    return this.recipeService.getPathPhoto(recette);
  }

  onDeleteRecipe(recipe: Recipe): void {
    this.recipeService.deleteRecipe(recipe.id);
  }

  ngOnDestroy(): void {
    this.selectedRecipeSubscription.unsubscribe();
    this.isSelectedRecipeSubscription.unsubscribe();
  }

}
