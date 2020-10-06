package com.personalRecipe;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.personalRecipe.bll.IngredientManager;
import com.personalRecipe.bll.InstructionManager;
import com.personalRecipe.bll.RecetteManager;
import com.personalRecipe.bo.Ingredient;
import com.personalRecipe.bo.Instruction;
import com.personalRecipe.bo.Recette;

@SpringBootTest
class PersonalRecipeApplicationTests {

	@Autowired
	RecetteManager recetteManager;

	@Autowired
	InstructionManager instructionManager;

	@Autowired
	IngredientManager ingredientManager;

	@Test
	void contextLoads() {
		for (int i = 0; i < 10; i++) {
			Ingredient ingredient = new Ingredient("Tomates", 2, "");
			Instruction instruction = new Instruction("Peler les tomates.");
			Recette recette = new Recette(2, "Tomates pelées",
					"https://upload.wikimedia.org/wikipedia/commons/d/db/Galette_Auray.jpg");
			List<Ingredient> ingredients = new ArrayList<Ingredient>();
			List<Instruction> instructions = new ArrayList<Instruction>();

			ingredients.add(ingredient);
			instructions.add(instruction);

			instruction.setRecette(recette);
			ingredient.setRecette(recette);
			recette.setIngredients(ingredients);
			recette.setInstructions(instructions);

			recetteManager.createRecipe(recette);

		}
	}

}
