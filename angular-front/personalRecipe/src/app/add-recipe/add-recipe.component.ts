import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent implements OnInit {
  recipeForm: FormGroup;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        nom: new FormControl('', Validators.required),
        quantite: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
        unite: new FormControl('', Validators.required),
      })
    );
  }

  onAddInstruction(): void {
    (this.recipeForm.get('instructions') as FormArray).push(
      new FormGroup({
        description: new FormControl('', Validators.required),
      })
    );
  }

  private initForm(): void {
    this.recipeForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      pathPhoto: new FormControl('', Validators.required),
      nbPersonnes: new FormControl(null,  [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      ingredients: new FormArray([]),
      instructions: new FormArray([]),
    });
  }

  onSubmit(): void {
    this.recipeService.addRecipe(this.recipeForm.value);
  }



}
