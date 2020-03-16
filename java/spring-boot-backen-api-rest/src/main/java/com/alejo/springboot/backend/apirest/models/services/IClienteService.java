package com.alejo.springboot.backend.apirest.models.services;

import java.util.List;

import com.alejo.springboot.backend.apirest.model.entity.Cliente;

public interface IClienteService {
	
	public List<Cliente> findAll();
	
	public Cliente findById(Long id);
	
	public Cliente save(Cliente cliente);
	
	public Cliente update(Cliente cliente);
	
	public void delete(Long id);

	public String procedureName(String param1, String param2);
	
}
