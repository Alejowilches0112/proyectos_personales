package com.alejo.springboot.backend.apirest.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alejo.springboot.backend.apirest.model.entity.Cliente;
import com.alejo.springboot.backend.apirest.models.dao.IClienteDao;
import com.google.gson.Gson;

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
	public long procedureName(String param1) {
		long outParam = clienteDao.procedureName(param1);
		return outParam;
	}
	@Override
	@Transactional
	public long functionName(Long param1) {
		return clienteDao.functionName(param1);
	}
	@Override
	@Transactional
	public Page<Cliente> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return clienteDao.findAll(pageable);
	}
	@Override
	@Transactional
	public Cliente getIdCliente(Long id) {
		// TODO Auto-generated method stub
		String data = clienteDao.getIdCliente(id);
		Cliente c = null;
		try {
			Gson gson = new Gson();
			c = gson.fromJson(data, Cliente.class);
		} catch (Exception e) {
			System.err.println(e.getMessage().toString().concat(" : ").concat(e.getCause().toString()));
			// TODO: handle exception
		}
		return c;
	}


}
