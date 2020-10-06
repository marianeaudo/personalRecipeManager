package com.personalRecipe.dal;

import org.springframework.data.jpa.repository.JpaRepository;

import com.personalRecipe.bo.Ingredient;

public interface IngredientRepository extends JpaRepository<Ingredient, Integer>{

}
