package com.alejo.springboot.backend.apirest.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alejo.springboot.backend.apirest.model.entity.Region;
import com.alejo.springboot.backend.apirest.models.dao.IRegionDao;

@Service
public class RegionServiceImpl implements IRegionService {

	@Autowired
	private IRegionDao regionDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<Region> findAll() {
		return (List<Region>) regionDao.findAll();
	}


}
