package com.personalRecipe.dal;

import org.springframework.data.jpa.repository.JpaRepository;

import com.personalRecipe.bo.Instruction;

public interface InstructionRepository extends JpaRepository<Instruction, Integer> {
	
}
