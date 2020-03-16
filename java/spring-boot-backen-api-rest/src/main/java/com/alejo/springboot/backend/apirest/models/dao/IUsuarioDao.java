package com.alejo.springboot.backend.apirest.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.alejo.springboot.backend.apirest.model.entity.Usuario;

public interface IUsuarioDao extends CrudRepository<Usuario, Long>{
	public Usuario findByUsuario(String u);
}
