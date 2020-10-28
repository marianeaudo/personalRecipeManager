import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../shared/recipe.service';
import { ApplicationService } from '../shared/application.service';
import { Recipe } from '../shared/application.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup;
  unites: string[] = [
    '',
    'g',
    'cL',
    'L',
    'c.s.',
    'c.c.',
    'pincée',
    'noisette',
    'pointe',
  ];
  pathPhoto: string;
  editMode = false;
  selectedRecipe: Recipe;

  constructor(
    private applicationService: ApplicationService,
    private recipeService: RecipeService)
    {}

  ngOnInit(): void {
    this.editMode = this.applicationService.getEditMode();
    this.selectedRecipe = this.recipeService.getSelectedRecipe();
    this.initForm();
    this.pathPhoto = this.selectedRecipe.pathPhoto;
    console.log(this.recipeForm.get('instructions')['controls']);
    }

  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        id: new FormControl(0),
        nom: new FormControl('', Validators.required),
        quantite: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^(\d*\.)?\d+$/),
        ]),
        unite: new FormControl('')
      })
    );
  }

  onAddInstruction(): void {
    (this.recipeForm.get('instructions') as FormArray).push(
      new FormGroup({
        id: new FormControl(0),
        description: new FormControl('', Validators.required),
        // ordre: new FormControl({value: this.recipeForm.get('instructions')['controls'].length + 1, disabled: false}, Validators.required)
        ordre: new FormControl({value: 1, disabled: false}, Validators.required)
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
            id: new FormControl(ingredient.id),
            nom: new FormControl(ingredient.nom, Validators.required),
            quantite: new FormControl(ingredient.quantite, [
              Validators.required,
              Validators.pattern(/^(\d*\.)?\d+$/),
            ]),
            unite: new FormControl(ingredient.unite)
          })
        );
      }
      for (const instruction of this.selectedRecipe.instructions) {
        recipeInstructions.push(
          new FormGroup({
            id: new FormControl(instruction.id),
            description: new FormControl(
              instruction.description,
              Validators.required
            ),
            ordre: new FormControl(
              {value: instruction.ordre, disabled: false},
              Validators.required
            )
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
      instructions: recipeInstructions,
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
    if (this.editMode) {
      const recette = {
        id: this.selectedRecipe.id,
        ...this.recipeForm.value
      } as Recipe;
      let compteur = 1;
      recette.instructions.forEach(instruction => {
        instruction.ordre = compteur;
        compteur += 1;
      })
      console.log(this.recipeForm.value);
      this.recipeService.editRecipe(recette);
    } else {
      this.recipeService.createRecipe(this.recipeForm.value);
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
      moveItemInArray(
        this.recipeForm.get('instructions').value,
        event.previousIndex,
        event.currentIndex
      );

      moveItemInArray(
      this.recipeForm.get('instructions')['controls'],
      event.previousIndex,
      event.currentIndex
    );
  }

  ngOnDestroy(): void {
    this.applicationService.setEditMode(false);
    this.recipeService.setSelectedRecipe(null);
  }
}
