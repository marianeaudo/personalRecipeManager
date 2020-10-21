import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../shared/recipe.service';
import { ApplicationService } from '../shared/application.service';
import { Recipe } from '../shared/application.model';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup;
  unites: string[] = ['Pas d\'unité', 'g', 'cL', 'L', 'c.s.', 'c.c.', 'pincée'];
  pathPhoto: string;
  editMode = false;
  selectedRecipe: Recipe;

  constructor(
    private applicationService: ApplicationService,
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editMode = this.applicationService.getEditMode();
    this.selectedRecipe = this.recipeService.getSelectedRecipe();
    this.initForm();
    this.pathPhoto = this.selectedRecipe.pathPhoto;
  }

  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        nom: new FormControl('', Validators.required),
        quantite: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
        unite: new FormControl('', Validators.required)
      })
    );
  }

  onAddInstruction(): void {
    (this.recipeForm.get('instructions') as FormArray).push(
      new FormGroup({
        description: new FormControl('', Validators.required)
      })
    );
  }

  private initForm(): void {

    let recipeNom: string;
    let recipePathPhoto: string;
    let recipeNbPersonnes: number;
    const recipeIngredients = new FormArray([]);
    const recipeInstructions = new FormArray([]);

    if (this.editMode) {
      recipeNom = this.selectedRecipe.nom;
      recipePathPhoto = this.selectedRecipe.pathPhoto;
      recipeNbPersonnes = this.selectedRecipe.nbPersonnes;
      for (const ingredient of this.selectedRecipe.ingredients) {
        recipeIngredients.push(
          new FormGroup({
            nom: new FormControl(ingredient.nom, Validators.required),
            quantite: new FormControl(ingredient.quantite, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/),
            ]),
            unite: new FormControl(ingredient.unite, Validators.required)
          })
        );
      }
      for (const instruction of this.selectedRecipe.instructions) {
        recipeInstructions.push(
          new FormGroup({
            description: new FormControl(instruction.description, Validators.required)
          })
        );
      }
    }

    this.recipeForm = new FormGroup({
      nom: new FormControl(recipeNom, Validators.required),
      pathPhoto: new FormControl(recipePathPhoto, Validators.required),
      nbPersonnes: new FormControl(recipeNbPersonnes, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
      ingredients: recipeIngredients,
      instructions: recipeInstructions
    });
  }

  updatePath(event: any): void {
    if (event != null) {
      this.pathPhoto = event.target.value;
    }
  }

  onDeleteIngredient(i: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(i);
  }

  onDeleteInstruction(i: number): void {
    (this.recipeForm.get('instructions') as FormArray).removeAt(i);
  }

  onSubmit(): void {
    this.recipeService.createRecipe(this.recipeForm.value);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.applicationService.setEditMode(false);
    this.recipeService.setSelectedRecipe(null);
  }
}
