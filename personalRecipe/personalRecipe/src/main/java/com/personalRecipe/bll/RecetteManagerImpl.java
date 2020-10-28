package com.personalRecipe.bll;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.personalRecipe.bo.Ingredient;
import com.personalRecipe.bo.Instruction;
import com.personalRecipe.bo.Recette;
import com.personalRecipe.dal.IngredientRepository;
import com.personalRecipe.dal.InstructionRepository;
import com.personalRecipe.dal.RecetteRepository;

@Service
public class RecetteManagerImpl implements RecetteManager {

	@Autowired
	RecetteRepository recetteDAO;

	@Autowired
	IngredientRepository ingredientDAO;

	@Autowired
	InstructionRepository instructionDAO;

	@Override
	public List<Recette> getAll() {
		return recetteDAO.findByOrderByNomAsc();
	}

	@Override
	public void deleteRecipe(int id) {
		recetteDAO.deleteById(id);
	}

	@Override
	public void createRecipe(Recette recette) {
		recetteDAO.save(recette);
	}

	@Override
	public void updateRecipe(Recette recette) {
		recetteDAO.save(recette);
	}

	@Override
	public Recette getRecipeById(int id) {
		return this.recetteDAO.findById(id).get();
	}

}
