package com.personalRecipe.ws;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.personalRecipe.bll.RecetteManager;
import com.personalRecipe.bo.Recette;

@RestController
public class RecetteWS {
	
	@Autowired
	RecetteManager recetteManager;

	@GetMapping(value="recettes")
	public List<Recette> getRecettes() {
		return recetteManager.getAll();
	}
	
}
