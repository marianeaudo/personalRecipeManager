package com.personalRecipe.bll;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.personalRecipe.bo.Recette;
import com.personalRecipe.dal.RecetteRepository;

@Service
public class RecetteManagerImpl implements RecetteManager{

	@Autowired
	RecetteRepository recetteDAO;
	
	@Override
	public List<Recette> getAll() {
		return recetteDAO.findAll();
	}
	
	@Override
	public void deleteRecipe(int id) {
		recetteDAO.deleteById(id);
	}
	
	@Override
	public void createRecipe(Recette recette) {
		recetteDAO.save(recette);
	}

}
