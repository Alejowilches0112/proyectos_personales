package com.alejo.springboot.backend.apirest.auth;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

import com.alejo.springboot.backend.apirest.model.entity.Usuario;
import com.alejo.springboot.backend.apirest.models.services.IUsuarioService;

@Component
public class infoAdicionalToken implements TokenEnhancer {
	
	@Autowired
	IUsuarioService usuarioService;
	
	@Override
	public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
		// TODO Auto-generated method stub
		Usuario usr = usuarioService.findByUsername(authentication.getName());
		Map<String, Object> info = new HashMap<>();
		info.put("username", authentication.getName());
		info.put("nombre_usuario", usr.getNombre());
		info.put("apellido_usuario", usr.getApellido());
		info.put("email_usuario", usr.getEmail());
		((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(info);
		return accessToken;
	}

}
