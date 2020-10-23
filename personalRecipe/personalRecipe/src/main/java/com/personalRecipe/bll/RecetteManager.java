package com.personalRecipe.bll;

import java.util.List;

import com.personalRecipe.bo.Ingredient;
import com.personalRecipe.bo.Instruction;
import com.personalRecipe.bo.Recette;

public interface RecetteManager {

	public List<Recette> getAll();
	public void createRecipe(Recette recette);
	public void updateRecipe(Recette recette);
	public void deleteRecipe(int id);

}
