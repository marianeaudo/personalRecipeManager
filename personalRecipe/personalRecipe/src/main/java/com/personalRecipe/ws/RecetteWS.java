package com.personalRecipe.ws;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.personalRecipe.bll.IngredientManager;
import com.personalRecipe.bll.InstructionManager;
import com.personalRecipe.bll.RecetteManager;
import com.personalRecipe.bo.Ingredient;
import com.personalRecipe.bo.Instruction;
import com.personalRecipe.bo.Recette;

@RestController
public class RecetteWS {

	@Autowired
	RecetteManager recetteManager;
	
	@Autowired
	IngredientManager ingredientManager;
	
	@Autowired
	InstructionManager instructionManager;

	@CrossOrigin
	@GetMapping(value = "recettes")
	public List<RecetteDTO> getRecettes() {
		return recetteManager.getAll().stream()
				.map(this::createRecetteDTO)
				.collect(Collectors.toList());
	}
	
	@CrossOrigin
	@PostMapping(value = "createRecette")
	public void createRecette(@RequestBody RecetteDTO recetteDTO) {
		Recette recette = new Recette();
		this.updateCommonFields(recette, recetteDTO);
		this.recetteManager.createRecipe(recette);
	}
	
	@CrossOrigin
	@PostMapping(value="updateRecette")
	public void updateRecette(@RequestBody RecetteDTO recetteDTO) {
		Recette recette = this.recetteManager.getRecipeById(recetteDTO.getId());
		
		List<Integer> ingredientsId = this.getIngredientsId(recette);
		List<Integer> instructionsId = this.getInstructionsId(recette);
				
		if (recette == null) {
			recette = new Recette();
		}
		
		this.updateCommonFields(recette, recetteDTO);
				
		List<Integer> ingredientsIdUpdated = this.getIngredientsId(recette);
		List<Integer> instructionsIdUpdated = this.getInstructionsId(recette);
	
		ingredientsId.forEach(ingredientId -> {
			if (!ingredientsIdUpdated.contains(ingredientId)) {
				this.ingredientManager.deleteIngredientById(ingredientId);
			}
		});
		
		instructionsId.forEach(instructionId -> {
			if (!instructionsIdUpdated.contains(instructionId)) {
				this.instructionManager.deleteInstructionById(instructionId);
			}
		});
		
		this.recetteManager.updateRecipe(recette);
	}

	@CrossOrigin
	@RequestMapping(value = "deleteRecette")
	public void deleteRecette(@RequestParam(name = "id") int id) {
		recetteManager.deleteRecipe(id);
	}
	
	private RecetteDTO createRecetteDTO(Recette recette) {
		RecetteDTO recetteDTO = new RecetteDTO();
		recetteDTO.setId(recette.getId());
		recetteDTO.setNbPersonnes(recette.getNbPersonnes());
		recetteDTO.setNom(recette.getNom());
		recetteDTO.setPathPhoto(recette.getPathPhoto());
		recetteDTO.setIngredients(recette.getIngredients().stream()
				.map(this::createIngredientDTO)
				.collect(Collectors.toList()));
		recetteDTO.setInstructions(recette.getInstructions().stream()
				.map(this::createInstructionDTO)
				.collect(Collectors.toList()));
		return recetteDTO;
	}
	
	private IngredientDTO createIngredientDTO(Ingredient ingredient) {
		IngredientDTO ingredientDTO = new IngredientDTO();
		ingredientDTO.setId(ingredient.getId());
		ingredientDTO.setNom(ingredient.getNom());
		ingredientDTO.setQuantite(ingredient.getQuantite());
		ingredientDTO.setUnite(ingredient.getUnite());
		return ingredientDTO;
	}
	
	private InstructionDTO createInstructionDTO(Instruction instruction) {
		InstructionDTO instructionDTO = new InstructionDTO();
		instructionDTO.setId(instruction.getId());
		instructionDTO.setOrdre(instruction.getOrdre());
		instructionDTO.setDescription(instruction.getDescription());
		return instructionDTO;
	}
	
	private void updateCommonFields(Recette recette, RecetteDTO recetteDTO) {
		recette.setNom(recetteDTO.getNom());
		recette.setPathPhoto(recetteDTO.getPathPhoto());
		recette.setNbPersonnes(recetteDTO.getNbPersonnes());
		
		recette.setIngredients(recetteDTO.getIngredients().stream()
		.map(ingredientDTO -> {
			Ingredient ingredient = ingredientManager.getIngredientById(ingredientDTO.getId());
			
			if (ingredient == null) {
				ingredient = new Ingredient();
				recette.addIngredient(ingredient);
			}
			ingredient.setNom(ingredientDTO.getNom());
			ingredient.setQuantite(ingredientDTO.getQuantite());
			ingredient.setUnite(ingredientDTO.getUnite());
			return ingredient;
		}).collect(Collectors.toList()));
				
		recette.setInstructions(recetteDTO.getInstructions().stream()
		.map(instructionDTO -> {
			Instruction instruction = instructionManager.getInstructionById(instructionDTO.getId());
			
			if(instruction == null) {
				instruction = new Instruction();
				recette.addInstruction(instruction);
			}
			instruction.setDescription(instructionDTO.getDescription());
			instruction.setOrdre(instructionDTO.getOrdre());
			return instruction;
		}).collect(Collectors.toList()));
	}
	
	private List<Integer> getIngredientsId(Recette recette) {
		List<Integer> ingredientsId = recette.getIngredients().stream()
				.map(Ingredient::getId)
				.collect(Collectors.toList());
		return ingredientsId;
	}
	
	private List<Integer> getInstructionsId(Recette recette) {
		List<Integer> instructionsId = recette.getInstructions().stream()
				.map(Instruction::getId)
				.collect(Collectors.toList());
		return instructionsId;	
	}
}