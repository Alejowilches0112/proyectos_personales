package com.alejo.springboot.backend.apirest.models.dao;

import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.alejo.springboot.backend.apirest.model.entity.Cliente;

public interface IClienteDao extends CrudRepository<Cliente, Long>{
	@Procedure(name = "java_procedure_name")
    String procedureName(@Param("inputParam1") String inputParam1, @Param("inputParam2") String inputParam2);
}
