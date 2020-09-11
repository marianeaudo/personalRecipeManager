import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../models/ingredient.model';
import { Instruction } from '../models/instruction.model';
import { Recette } from '../models/recette.model';

@Component({
  selector: 'app-ajout-recette',
  templateUrl: './ajout-recette.component.html',
  styleUrls: ['./ajout-recette.component.scss']
})
export class AjoutRecetteComponent implements OnInit {

  unites: string[] = ['Sans unité', 'mL', 'cL', 'L', 'g', 'cuillère à café', 'cuillère à soupe', 'pincée'];
  nomRecette: string = '';
  ingredients: Ingredient[] = [];
  instructions: Instruction[] = [];
  recette: Recette;
  nbIngredients: number[] = [1];
  nbInstructions: number[] = [1];

  constructor() { }

  ngOnInit() {
  }

  onAjouterNouvelIngredient() {
    this.nbIngredients.push(1);
  }

  onAjouterNouvelleInstruction() {
    this.nbInstructions.push(1);
  }

  onSubmitNomRecette(form: NgForm) {

    this.nomRecette = form.value['nomRecette'];

    const ingredient: Ingredient = new Ingredient(form.value['name'], form.value['quantite'], form.value['unite']);
    this.ingredients.push(ingredient);

    const instruction: Instruction = new Instruction(form.value['instruction']);
    this.instructions.push(instruction);
    }
  }
