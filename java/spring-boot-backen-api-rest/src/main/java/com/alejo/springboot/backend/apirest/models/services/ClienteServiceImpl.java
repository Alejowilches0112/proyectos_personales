package com.alejo.springboot.backend.apirest.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alejo.springboot.backend.apirest.model.entity.Cliente;
import com.alejo.springboot.backend.apirest.models.dao.IClienteDao;

@Service
public class ClienteServiceImpl implements IClienteService {

	@Autowired
	private IClienteDao clienteDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<Cliente> findAll() {
		return (List<Cliente>) clienteDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Cliente findById(Long id) {
		return clienteDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Cliente save(Cliente cliente) {
		// TODO Auto-generated method stub
		return clienteDao.save(cliente);
	}

	@Override
	@Transactional
	public Cliente update(Cliente cliente) {
		
		return cliente;
	}

	@Override
	@Transactional
	public void delete(Long id) {
		clienteDao.deleteById(id);	
	}

	@Override
	@Transactional
	public String procedureName(String param1, String param2) {
		String outParam = clienteDao.procedureName(param1, param2);
		return outParam;
	}


}
