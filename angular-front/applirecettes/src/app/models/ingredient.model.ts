export class Ingredient {
    public nom: string;
    public quantite: number;
    public unite: string;

    constructor(nom: string, quantite: number, unite: string) {
        this.nom = nom;
        this.quantite = quantite;
        this.unite = unite;
    }
}