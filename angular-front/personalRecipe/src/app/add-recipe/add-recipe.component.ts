import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent implements OnInit {
  recipeForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        ingredientName: new FormControl('', Validators.required),
        ingredientQuantity: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
        ingredientUnit: new FormControl('', Validators.required),
      })
    );
  }

  onAddInstruction(): void {
    (this.recipeForm.get('instructions') as FormArray).push(
      new FormGroup({
        instructionDescription: new FormControl('', Validators.required),
      })
    );
  }

  private initForm(): void {
    this.recipeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      imagePath: new FormControl('', Validators.required),
      ingredients: new FormArray([]),
      instructions: new FormArray([]),
    });
  }

  onSubmit(): void {}
}
