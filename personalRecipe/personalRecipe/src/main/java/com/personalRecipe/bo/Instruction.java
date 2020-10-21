package com.personalRecipe.bo;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

@Entity
@Data
public class Instruction {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String description;
	@ManyToOne(cascade= {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JsonBackReference
	private Recette recette;
	
	public Instruction() {
	}	
	
	public Instruction(String description) {
		this.description = description;
	}	

}
