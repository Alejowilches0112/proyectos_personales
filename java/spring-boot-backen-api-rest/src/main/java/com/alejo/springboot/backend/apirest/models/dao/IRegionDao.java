package com.alejo.springboot.backend.apirest.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alejo.springboot.backend.apirest.model.entity.Region;

public interface IRegionDao extends JpaRepository<Region, Long>{

}
