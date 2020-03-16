package com.alejo.springboot.backend.apirest.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alejo.springboot.backend.apirest.model.entity.Cliente;
import com.alejo.springboot.backend.apirest.models.services.IClienteService;

@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:8082", "http://bitacora.test"})
@RestController
@RequestMapping("/api")
public class ClienteRestController {
	@Autowired
	private IClienteService clienteService;
	
	@GetMapping("/clientes")
	public ResponseEntity<?> findAll(){
		List<Cliente> data = null;
		Map<String, Object> response = new HashMap<>();
		try
		{
			data = clienteService.findAll();
		}
		catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Cliente>>(data, HttpStatus.OK);
	}
	
	@Secured("ROLE_ADMIN")
	@GetMapping("/clientes/{id}")
	public ResponseEntity<?> findById(@PathVariable Long id){
		Cliente cliente = null;
		Map<String, Object> response = new HashMap<>();
		try {
			cliente = clienteService.findById(id);
		}
		catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		if(cliente == null) {
			response.put("mensaje", "Cliente no encontrado");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Cliente>(cliente, HttpStatus.OK);
	}
	
	@Secured("ROLE_ADMIN")
	@PostMapping("/clientes")
	public ResponseEntity<?> save(@Valid @RequestBody Cliente cliente, BindingResult result) {
		Cliente data = null;
		Map<String, Object> response = new HashMap<>();
		System.err.println(result.hasErrors());
		if(result.hasErrors())
		{
			/* 
			 * JDK9+
			 List<String> errores = new ArrayList<String>();
			for(FieldError err: result.getFieldErrors()) 
			{    
				errores.add(err.getField().toString().concat(" ").concat(err.getDefaultMessage()));
			}*/
			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err -> err.getField().toString().concat(" ").concat(err.getDefaultMessage()))
					.collect(Collectors.toList());
			response.put("errores", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		try 
		{
			data = clienteService.save(cliente);
		}
		catch (DataAccessException e) 
		{
			response.put("mensaje", "Error al guardar el Cliente");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("cliente", data);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@Secured("ROLE_ADMIN")
	@PutMapping("/clientes/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody Cliente cliente, BindingResult result ,@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		if(result.hasErrors())
		{
			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err -> err.getField().toString().concat(" ").concat(err.getDefaultMessage()))
					.collect(Collectors.toList());
			response.put("errores", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		Cliente clienteActual = clienteService.findById(id);
		Cliente data = null;
		clienteActual.setApellido(cliente.getApellido());
		clienteActual.setNombre(cliente.getNombre());
		clienteActual.setEmail(cliente.getEmail());
		try {
			data = clienteService.save(clienteActual);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al actualizar el Cliente");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("cliente", data);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@Secured("ROLE_ADMIN")
	@DeleteMapping("/clientes/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		try {
			clienteService.delete(id);			
		}  catch (DataAccessException e) {
			response.put("mensaje", "Error al actualizar el Cliente");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "Cliente Eliminado");
		return new ResponseEntity<Map<String, Object>>(response,HttpStatus.OK);
	}
	@PostMapping("/clientes/prueba")
	public String prueba() {
		String prueba = "";
		try {
			clienteService.procedureName("p1", "p2");
		} catch (DataAccessException e) {
			prueba = e.getMessage()+": "+e.getCause().getMessage();
			// TODO: handle exception
		}
		return prueba;
	}
}
