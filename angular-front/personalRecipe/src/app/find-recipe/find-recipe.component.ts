import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../shared/application.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationService } from '../shared/application.service';


@Component({
  selector: 'app-find-recipe',
  templateUrl: './find-recipe.component.html',
  styleUrls: ['./find-recipe.component.scss']
})
export class FindRecipeComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  recipesSubscription: Subscription;
  columnsToDisplay = ['nom', 'photo'];
  dataSource = new MatTableDataSource<Recipe>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private recipeService: RecipeService, private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.applicationService.translateMatPaginator(this.paginator);
    this.recipesSubscription = this.recipeService.recipesSubject.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
        this.dataSource = new MatTableDataSource<Recipe>(this.recipes);
        this.dataSource.paginator = this.paginator;
      }
    );
    this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }

}
