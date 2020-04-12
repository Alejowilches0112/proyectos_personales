package com.alejo.springboot.backend.apirest.models.services;

import java.util.List;

import com.alejo.springboot.backend.apirest.model.entity.Region;

public interface IRegionService {
	
	public List<Region> findAll();
	
}
