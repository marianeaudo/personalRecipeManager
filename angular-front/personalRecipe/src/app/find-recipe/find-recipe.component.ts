import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from '../shared/recipe.service';
import { Recipe } from '../shared/application.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationService } from '../shared/application.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-find-recipe',
  templateUrl: './find-recipe.component.html',
  styleUrls: ['./find-recipe.component.scss'],
})
export class FindRecipeComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipesSubscription: Subscription;
  columnsToDisplay = ['nom', 'photo', 'nbPersonnes'];
  dataSource = new MatTableDataSource<Recipe>();
  selectedRecipe: Recipe;
  selectedRecipeSubscription: Subscription;
  isLoading = false;
  isLoadingSubscription: Subscription;
  myControl = new FormControl();
  options: string[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private recipeService: RecipeService, private applicationService: ApplicationService) {
  }

  ngOnInit(): void {

    this.isLoadingSubscription = this.recipeService.isLoadingSubject.subscribe(
      (isLoading: boolean) => {
        this.isLoading = isLoading;
      }
    );
    this.recipesSubscription = this.recipeService.recipesSubject.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
        this.paginatorInit();
      },
    );
    this.recipeService.getRecipes();
    this.selectedRecipeSubscription = this.recipeService.selectedRecipeSubject.subscribe(
      (recipe: Recipe) => {
        this.selectedRecipe = recipe;
      }
    );
  }

  onSelectRecipe(recipe: Recipe): void {
    this.recipeService.setSelectedRecipe(recipe);
  }

  onLower(recipe: Recipe): void {
    this.onSelectRecipe(recipe);
    recipe.nbPersonnes -= 1;
    this.selectedRecipe.nbPersonnes -= 1;
    recipe.ingredients.forEach((ingredient) => {
      ingredient.quantite = (ingredient.quantite * recipe.nbPersonnes) / (recipe.nbPersonnes + 1);
    });
  }

  onHigher(recipe: Recipe): void {
    this.onSelectRecipe(recipe);
    recipe.nbPersonnes += 1;
    this.selectedRecipe.nbPersonnes += 1;
    recipe.ingredients.forEach((ingredient) => {
      ingredient.quantite = (ingredient.quantite * recipe.nbPersonnes) / (recipe.nbPersonnes - 1);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  paginatorInit(): void {
    this.dataSource = new MatTableDataSource<Recipe>(this.recipes);
    this.dataSource.paginator = this.paginator;
    this.applicationService.translateMatPaginator(this.paginator);
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
    this.isLoadingSubscription.unsubscribe();
  }
}
