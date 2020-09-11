import { Ingredient } from './ingredient.model';
import { Instruction } from './instruction.model';

export class Recette {

    public nom: string;
    public nbPersonnes: number;
    public pathPhoto: string;
    public ingredients: Ingredient[] = [];
    public instructions: Instruction[] = [];

    constructor(nom: string, nbPersonnes: number, pathPhoto: string, ingredients: Ingredient[], instructions: Instruction[]) {
        this.nom = nom;
        this.nbPersonnes = nbPersonnes;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.pathPhoto = pathPhoto;
    }
}
