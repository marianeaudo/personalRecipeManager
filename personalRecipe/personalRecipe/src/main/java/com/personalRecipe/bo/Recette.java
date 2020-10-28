package com.personalRecipe.bo;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Entity
public class Recette {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private int nbPersonnes;
	private String nom;
	private String pathPhoto;
	@OneToMany(mappedBy = "recette", cascade = CascadeType.ALL)
	private List<Ingredient> ingredients = new ArrayList<>();
	@OneToMany(mappedBy = "recette", cascade = CascadeType.ALL)
	private List<Instruction> instructions = new ArrayList<>();
	
	public Recette() {
	}
	
	public Recette(int nbPersonnes, String nom, String pathPhoto) {
		this.nbPersonnes = nbPersonnes;
		this.nom = nom;
		this.pathPhoto = pathPhoto;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getNbPersonnes() {
		return nbPersonnes;
	}

	public void setNbPersonnes(int nbPersonnes) {
		this.nbPersonnes = nbPersonnes;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPathPhoto() {
		return pathPhoto;
	}

	public void setPathPhoto(String pathPhoto) {
		this.pathPhoto = pathPhoto;
	}

	public List<Ingredient> getIngredients() {
		return ingredients;
	}

	public void setIngredients(List<Ingredient> ingredients) {
		this.ingredients = ingredients;
	}

	public List<Instruction> getInstructions() {
		return instructions;
	}

	public void setInstructions(List<Instruction> instructions) {
		this.instructions = instructions;
	}

//	@Override
//	public String toString() {
//		return "Recette [id=" + id + ", nbPersonnes=" + nbPersonnes + ", nom=" + nom + ", pathPhoto=" + pathPhoto
//				+ ", ingredients=" + ingredients + ", instructions=" + instructions + "]";
//	}

	public void addIngredient(Ingredient ingredient) {
		this.ingredients.add(ingredient);
		ingredient.setRecette(this);
	}
	
	public void addInstruction(Instruction instruction) {
		this.instructions.add(instruction);
		instruction.setRecette(this);
	}
}
