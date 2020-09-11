import { Injectable, EventEmitter } from '@angular/core';
import { Recette } from '../models/recette.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecettesService {
  public recettes: Recette[] = [];
  recipeSelected = new EventEmitter<Recette>();

  constructor(private httpClient: HttpClient) {
    this.getRecipes();
  }

  getRecipes(): any {
    this.httpClient.get('http://localhost:8080/recettes').subscribe(
      (response: any) => {
        for (const recipe of response) {
          const recette: Recette = new Recette(
            recipe.nom,
            recipe.nbPersonnes,
            recipe.pathPhoto,
            recipe.ingredients,
            recipe.instructions
          );

          this.recettes.push(recette);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
