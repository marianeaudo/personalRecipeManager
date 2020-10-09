package com.personalRecipe.bll;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.personalRecipe.bo.Ingredient;
import com.personalRecipe.bo.Instruction;
import com.personalRecipe.bo.Recette;
import com.personalRecipe.dal.RecetteRepository;

@Service
public class RecetteManagerImpl implements RecetteManager{

	@Autowired
	RecetteRepository recetteDAO;
	
	@Override
	public List<Recette> getAll() {
		return recetteDAO.findAll();
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
	public Recette findById(int id) {
		return recetteDAO.findById(id).get();
	}

	@Override
	public void addIngredient(int id, Ingredient ingredient) {
		Recette recette = recetteDAO.findById(id).get();
		List<Ingredient> ingredients = new ArrayList<Ingredient>();
		ingredients.add(ingredient);
		recette.setIngredients(ingredients);
		ingredients.forEach(ingredientTemp -> ingredientTemp.setRecette(recette));
		recetteDAO.save(recette);
	}

	@Override
	public void addInstruction(int id, Instruction instruction) {
		Recette recette = recetteDAO.findById(id).get();
		List<Instruction> instructions = new ArrayList<Instruction>();
		instructions.add(instruction);
		recette.setInstructions(instructions);
		instructions.forEach(instructionTemp -> instructionTemp.setRecette(recette));
		recetteDAO.save(recette);
		
	}


}
