package com.personalRecipe.ws;

import java.io.Serializable;

import lombok.Data;

@Data
public class InstructionDTO implements Serializable {
	
	private int id;
	private String description;
	private int ordre;

}
