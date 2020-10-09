package com.personalRecipe.bll;

import java.util.List;
import java.util.Optional;

import com.personalRecipe.bo.Ingredient;
import com.personalRecipe.bo.Instruction;
import com.personalRecipe.bo.Recette;

public interface RecetteManager {

	public List<Recette> getAll();
	public void deleteRecipe(int id);
	public void createRecipe(Recette recette);
	public Recette findById(int id);
	public void addIngredient(int id, Ingredient ingredient);
	public void addInstruction(int id, Instruction instruction);
	public int getLastAddedRecipeId();
}
