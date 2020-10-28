package com.personalRecipe.bll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.personalRecipe.bo.Ingredient;
import com.personalRecipe.dal.IngredientRepository;

@Service
public class IngredientManagerImpl implements IngredientManager {

	@Autowired
	IngredientRepository daoIngredient;
	
	@Override
	public void createIngredient(Ingredient ingredient) {
		daoIngredient.save(ingredient);
	}

	@Override
	public Ingredient getIngredientById(int id) {
		Ingredient ingredient = null;
		if (id != 0) {
			ingredient = daoIngredient.findById(id).get();
		}
		return ingredient;
	}

	@Override
	public void deleteIngredientById(int id) {
		daoIngredient.deleteById(id);
	}	
	
}
