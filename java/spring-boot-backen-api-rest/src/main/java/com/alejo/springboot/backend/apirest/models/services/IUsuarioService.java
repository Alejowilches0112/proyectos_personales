package com.alejo.springboot.backend.apirest.models.services;

import com.alejo.springboot.backend.apirest.model.entity.Usuario;

public interface IUsuarioService {
	
	public Usuario findByUsername(String username);
	
}
