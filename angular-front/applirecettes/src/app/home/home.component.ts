import { Component, OnInit } from '@angular/core';
import { Recette } from '../models/recette.model';
import { RecettesService } from '../service/recettes.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  recettes: Recette[] = [];
  recetteSelection: Recette;

  constructor(private recettesService: RecettesService) {

  }

  ngOnInit() {
    this.recettes = this.recettesService.recettes;
    this.recettesService.recipeSelected.subscribe(
      (recette: Recette) => {
        this.recetteSelection = recette;
      }
    )
  }

  onSelectedRecette(recette: Recette) {
    this.recettesService.recipeSelected.emit(recette);
  }

  onAugmenterQuantite(recette: Recette) {
    this.onSelectedRecette(recette);
    this.recetteSelection.nbPersonnes += 1;
    for (let i = 0; i < this.recetteSelection.ingredients.length; i++) {
      this.recetteSelection.ingredients[i].quantite *= this.recetteSelection.nbPersonnes / (this.recetteSelection.nbPersonnes - 1);
    }
  }

  onDiminuerQuantite(recette: Recette) {
    this.onSelectedRecette(recette);
    if (this.recetteSelection.nbPersonnes > 1) {
      this.recetteSelection.nbPersonnes -= 1;
      for (let i = 0; i < this.recetteSelection.ingredients.length; i++) {
        this.recetteSelection.ingredients[i].quantite *= this.recetteSelection.nbPersonnes / (this.recetteSelection.nbPersonnes + 1);
      }
    }
  }


}
