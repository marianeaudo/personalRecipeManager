export interface Header {
  name: string;
  icon: string;
  route: string;
}

export interface Ingredient {
  id: number;
  nom: string;
  quantite: number;
  unite: string;
}

export interface Instruction {
  id: number;
  description: string;
}

export interface Recipe {
  id: number;
  nbPersonnes: number;
  nom: string;
  pathPhoto: string;
  ingredients: Ingredient[];
  instructions: Instruction[];

}
