package com.alejo.springboot.backend.apirest.models.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.alejo.springboot.backend.apirest.model.entity.Cliente;

public interface IClienteService {
	
	public List<Cliente> findAll();
	
	public Page<Cliente> findAll(Pageable pageable);
	
	public Cliente findById(Long id);
	
	public Cliente save(Cliente cliente);
	
	public Cliente update(Cliente cliente);
	
	public void delete(Long id);

	public long procedureName(String param1);
	
	public Cliente getIdCliente(Long id);
	
	public long functionName(Long param);
	
}
