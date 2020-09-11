package com.personalRecipe.bo;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity
@Data
public class Recette {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private int nbPersonnes;
	private String nom;
	private String pathPhoto;
	@OneToMany(mappedBy = "recette")
	private List<Ingredient> ingredients = new ArrayList<Ingredient>();
	@OneToMany(mappedBy = "recette")
	private List<Instruction> instructions = new ArrayList<Instruction>();
}
