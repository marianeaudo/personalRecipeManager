package com.personalRecipe.bll;

import com.personalRecipe.bo.Instruction;

public interface InstructionManager {

	public void createInstruction(Instruction instruction);
	public Instruction getInstructionById(int id);
	public void deleteInstructionById(int id);
}
