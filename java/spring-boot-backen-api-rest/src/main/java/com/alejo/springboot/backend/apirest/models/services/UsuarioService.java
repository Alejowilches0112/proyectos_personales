package com.alejo.springboot.backend.apirest.models.services;

/*import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alejo.springboot.backend.apirest.model.entity.Usuario;
import com.alejo.springboot.backend.apirest.models.dao.IUsuarioDao;

@Service*/
public class UsuarioService /*implements UserDetailsService*/{
	
/*	private Logger log = LoggerFactory.getLogger(UsuarioService.class);
	
	@Autowired
	private IUsuarioDao usuarioDao;
	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String usr) throws UsernameNotFoundException 
	{
		System.err.println(usr);
		Usuario u = usuarioDao.findByUsuario(usr);
		if(u == null)
		{
			log.error("Error en el Login: Usuario no existe");
			throw new UsernameNotFoundException("Error en el Login: Usuario no existe");
		}
		
		List<GrantedAuthority> authorities = u.getRoles()
				.stream()
				.map(rol -> new SimpleGrantedAuthority(rol.getNombre()))
				.peek(auto -> log.info("Rol: "+auto.getAuthority()))
				.collect(Collectors.toList());
		return new User(usr, u.getClave(), u.isEnabled(),true, true, true, authorities);
	}*/

}
