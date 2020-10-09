package com.personalRecipe.dal;

import org.springframework.data.jpa.repository.JpaRepository;

import com.personalRecipe.bo.Recette;

public interface RecetteRepository extends JpaRepository<Recette, Integer>{
	
	Recette findFirstByOrderByIdDesc();
	
}
