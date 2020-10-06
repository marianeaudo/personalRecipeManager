package com.personalRecipe.bll;

import java.util.List;

import com.personalRecipe.bo.Recette;

public interface RecetteManager {

	public List<Recette> getAll();
	public void deleteRecipe(int id);
	public void createRecipe(Recette recette);
}
