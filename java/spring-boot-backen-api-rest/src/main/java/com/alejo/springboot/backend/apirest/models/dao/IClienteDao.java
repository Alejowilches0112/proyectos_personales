package com.alejo.springboot.backend.apirest.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import com.alejo.springboot.backend.apirest.model.entity.Cliente;

public interface IClienteDao extends JpaRepository<Cliente, Long>{
	@Procedure("GET_TOTAL_CLIENTES")
    long procedureName(String inputParam1);
	
	@Query(nativeQuery = true, value = "select CalcIncome(:starting_value)")
    long functionName(@Param("starting_value") Long inputParam1);
}
