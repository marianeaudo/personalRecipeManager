package com.personalRecipe.bll;

import com.personalRecipe.bo.Ingredient;

public interface IngredientManager {

	public void createIngredient(Ingredient ingredient);
	public Ingredient getIngredientById(int id);
	public void deleteIngredientById(int id);
	
}
