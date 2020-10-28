package com.personalRecipe.ws;

import java.io.Serializable;

import com.personalRecipe.bo.Recette;

import lombok.Data;

@Data
public class IngredientDTO implements Serializable {
	
	private int id;
	private String nom;
	private double quantite;
	private String unite;

}
