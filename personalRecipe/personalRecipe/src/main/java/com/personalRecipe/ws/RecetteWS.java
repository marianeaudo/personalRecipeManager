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
		if (recette == null) {
			recette = new Recette();
		}
		
		List<Instruction> instructionsOld = this.getListInstructions(recette);
		List<Ingredient> ingredientsOld = this.getListIngredients(recette);
		
		this.updateCommonFields(recette, recetteDTO);
		
		List<Instruction> instructionsNew = this.getListInstructions(recette);
		List<Ingredient> ingredientsNew = this.getListIngredients(recette);
				
		instructionsOld.forEach(instruction -> {
			if (!instructionsNew.contains(instruction)) {
				this.instructionManager.deleteInstructionById(instruction.getId());
			}
		});
		
		ingredientsOld.forEach(ingredient -> {
			if (!ingredientsNew.contains(ingredient)) {
				this.ingredientManager.deleteIngredientById(ingredient.getId());
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
			return instruction;
		}).collect(Collectors.toList()));
	}
	
	private List<Ingredient> getListIngredients(Recette recette) {
		List<Ingredient> ingredients = new ArrayList<>();
		recette.getIngredients().forEach(ingredient -> {
			ingredients.add(ingredient);
		});
		return ingredients;		
	}
	
	private List<Instruction> getListInstructions(Recette recette) {
		List<Instruction> instructions = new ArrayList<>();
		recette.getInstructions().forEach(instruction -> {
			instructions.add(instruction);
		});
		return instructions;		
	}
}