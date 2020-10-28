package com.personalRecipe.ws;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class RecetteDTO implements Serializable {

	private int id;
	private int nbPersonnes;
	private String nom;
	private String pathPhoto;
	private List<IngredientDTO> ingredients = new ArrayList<>();
	private List<InstructionDTO> instructions = new ArrayList<>();
	
}
