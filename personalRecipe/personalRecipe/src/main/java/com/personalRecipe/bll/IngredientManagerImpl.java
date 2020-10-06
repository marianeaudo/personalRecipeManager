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

	
	
}
