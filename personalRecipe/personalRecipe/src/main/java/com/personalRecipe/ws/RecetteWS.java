package com.personalRecipe.ws;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	@RequestMapping(value = "addRecette")
	public void addRecette(@RequestParam(name = "nom") String nom, @RequestParam(name = "pathPhoto") String pathPhoto,
			@RequestParam(name = "nbPersonnes") int nbPersonnes) {
		Recette recette = new Recette(nbPersonnes, nom, pathPhoto);
		this.recetteManager.createRecipe(recette);
	}

	@CrossOrigin
	@RequestMapping(value = "getRecette")
	public Recette getRecette(@RequestParam(name = "id") int id) {
		return this.recetteManager.findById(id);
	}

	@CrossOrigin
	@RequestMapping("addIngredient")
	public void addIngredient(@RequestParam(name = "id") String id, @RequestParam(name = "nom") String nom,
			@RequestParam(name = "quantite") String quantite, @RequestParam(name = "unite") String unite) {
		Ingredient ingredient = new Ingredient(nom, Integer.parseInt(quantite), unite);
		this.recetteManager.addIngredient(Integer.parseInt(id), ingredient);
	}
	
	@CrossOrigin
	@RequestMapping("addInstruction")
	public void addIngredient(@RequestParam(name = "id") String id, @RequestParam(name = "description") String description) {
		Instruction instruction = new Instruction(description);
		this.recetteManager.addInstruction(Integer.parseInt(id), instruction);
	}

	@CrossOrigin
	@RequestMapping(value = "deleteRecette")
	public void deleteRecette(@RequestParam(name = "id") int id) {
		recetteManager.deleteRecipe(id);
	}

}
