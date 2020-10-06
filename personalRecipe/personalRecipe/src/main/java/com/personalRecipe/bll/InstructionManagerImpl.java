package com.personalRecipe.bll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.personalRecipe.bo.Instruction;
import com.personalRecipe.dal.InstructionRepository;

@Service
public class InstructionManagerImpl implements InstructionManager {

	@Autowired
	InstructionRepository instructionDAO;
	
	@Override
	public void createInstruction(Instruction instruction) {
		instructionDAO.save(instruction);		
	}

}
