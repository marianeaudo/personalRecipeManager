package com.personalRecipe.ws;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.personalRecipe.bll.RecetteManager;
import com.personalRecipe.bo.Ingredient;
import com.personalRecipe.bo.Instruction;
import com.personalRecipe.bo.Recette;

@RestController
public class RecetteWS {

	@Autowired
	RecetteManager recetteManager;

	@CrossOrigin
	@GetMapping(value = "recettes")
	public List<Recette> getRecettes() {
		return recetteManager.getAll();
	}
	
	@CrossOrigin
	@PostMapping(value = "createRecette")
	public void createRecette(@RequestBody Recette recette) {
		for (Ingredient ingredient : recette.getIngredients()) {
			ingredient.setRecette(recette);
		}
		for(Instruction instruction: recette.getInstructions()) {
			instruction.setRecette(recette);
		}
		this.recetteManager.createRecipe(recette);
	}

	@CrossOrigin
	@RequestMapping(value = "deleteRecette")
	public void deleteRecette(@RequestParam(name = "id") int id) {
		recetteManager.deleteRecipe(id);
	}

}
