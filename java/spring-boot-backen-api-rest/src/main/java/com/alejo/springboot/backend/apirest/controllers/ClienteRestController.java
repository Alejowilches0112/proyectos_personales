package com.alejo.springboot.backend.apirest.controllers;

import java.io.IOException; 
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.alejo.springboot.backend.apirest.model.entity.Cliente;
import com.alejo.springboot.backend.apirest.model.entity.Region;
import com.alejo.springboot.backend.apirest.models.services.IClienteService;
import com.alejo.springboot.backend.apirest.models.services.IRegionService;

//@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:8082" })
@RestController
@RequestMapping("/api")
public class ClienteRestController {
	@Autowired
	private IClienteService clienteService;

	@Autowired
	private IRegionService regionService;

	@GetMapping("/clientes")
	public ResponseEntity<?> findAll() {
		List<Cliente> data = null;
		Map<String, Object> response = new HashMap<>();
		try {
			data = clienteService.findAll();
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("clientes", data);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}

	@GetMapping("/clientes/page/{page}/{size}")
	public ResponseEntity<?> findAll(@PathVariable Integer page, @PathVariable Integer size) {
		Page<Cliente> data = null;
		Map<String, Object> response = new HashMap<>();
		try {
			Pageable pageable = PageRequest.of(page, size);
			data = clienteService.findAll(pageable);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Page<Cliente>>(data, HttpStatus.OK);
	}

	// @Secured("ROLE_ADMIN")
	@GetMapping("/clientes/{id}")
	public ResponseEntity<?> findById(@PathVariable Long id) {
		Cliente cliente = null;
		Map<String, Object> response = new HashMap<>();
		try {
			cliente = clienteService.findById(id);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("cliente", cliente);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}

	// @Secured("ROLE_ADMIN")
	@PostMapping("/clientes")
	public ResponseEntity<?> save(@Valid @RequestBody Cliente cliente, BindingResult result) {
		Cliente data = null;
		Map<String, Object> response = new HashMap<>();
		System.err.println(cliente.getCreateAt());
		if (result.hasErrors()) {
			List<String> errors = result.getFieldErrors().stream()
					.map(err -> err.getField().toString().concat(" ").concat(err.getDefaultMessage()))
					.collect(Collectors.toList());
			response.put("errores", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		try {
			data = clienteService.save(cliente);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al guardar el Cliente");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("cliente", data);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

	// @Secured("ROLE_ADMIN")
	@PutMapping("/clientes/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody Cliente cliente, BindingResult result, @PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		if (result.hasErrors()) {
			List<String> errors = result.getFieldErrors().stream()
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
		clienteActual.setCreateAt(cliente.getCreateAt());
		clienteActual.setRegion(cliente.getRegion());
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

	// @Secured("ROLE_ADMIN")
	@DeleteMapping("/clientes/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		try {
			Cliente cliente = clienteService.findById(id);
			if (cliente.getFoto() != null && cliente.getFoto().length() > 0) {
				Path fotoAnterior = Paths.get("D:\\uploades").resolve(cliente.getFoto()).toAbsolutePath();
				if (Files.exists(fotoAnterior)) {
					try {
						Files.delete(fotoAnterior);
					} catch (IOException e) {
						response.put("mensaje", "Error al actualizar el Cliente");
						response.put("error", e.getMessage().concat(": ").concat(e.getCause().getMessage()));
						return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
					}
				}
			}
			clienteService.delete(id);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al actualizar el Cliente");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "Cliente Eliminado");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}

	@PostMapping("/clientes/upload")
	public ResponseEntity<?> uploadFile(@RequestParam("id") Long id, @RequestParam("file") MultipartFile archivo) {
		Map<String, Object> response = new HashMap<>();
		try {
			Cliente cliente = clienteService.findById(id);
			if (!archivo.isEmpty()) {
				String nombreArchivo = UUID.randomUUID().toString() + "_"
						+ archivo.getOriginalFilename().replace("", "");
				Path rutaArchivo = Paths.get("D:\\uploades").resolve(nombreArchivo).toAbsolutePath();
				if (cliente.getFoto() != null && cliente.getFoto().length() > 0) {
					Path fotoAnterior = Paths.get("D:\\uploades").resolve(cliente.getFoto()).toAbsolutePath();
					if (Files.exists(fotoAnterior)) {
						Files.delete(fotoAnterior);

					}
				}
				Files.copy(archivo.getInputStream(), rutaArchivo);
				cliente.setFoto(nombreArchivo);
				clienteService.save(cliente);
				response.put("cliente", cliente);
				response.put("mensaje", "Ha subido correctamente la imagen: " + nombreArchivo);
			}
		} catch (IOException e) {
			response.put("mensaje", "Error al Subir la Imagen");
			response.put("error", e.getMessage().concat(": ").concat(e.getCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

	@GetMapping("/uploads/img/{foto:.+}")
	public ResponseEntity<Resource> verFoto(@PathVariable String foto) {
		Path rutaArchivo = Paths.get("D:\\uploades").resolve(foto).toAbsolutePath();
		System.err.println(rutaArchivo.toString());
		Resource recurso = null;
		try {
			recurso = new UrlResource(rutaArchivo.toUri());
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (!recurso.exists() && !recurso.isReadable()) {
			rutaArchivo = Paths.get("src/main/resources/static/images").resolve("no-usuario.png").toAbsolutePath();
			try {
				recurso = new UrlResource(rutaArchivo.toUri());
			} catch (MalformedURLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			// throw new RuntimeException("Error no se pudo cargar la imagen: "+foto);
		}
		HttpHeaders cabecera = new HttpHeaders();
		cabecera.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + recurso.getFilename() + "\"");
		return new ResponseEntity<Resource>(recurso, cabecera, HttpStatus.OK);
	}

	@PostMapping("/clientes/prueba")
	public String prueba(@RequestParam("parametro") String p1, @RequestParam("p2") Long p2) {
		System.err.println(p1 + " " + p2);
		String prueba = "";
		try {
			System.err.println(clienteService.procedureName(p1));
			System.err.println(clienteService.functionName(p2));
		} catch (DataAccessException e) {
			prueba = e.getMessage() + ": " + e.getCause().getMessage();
			// TODO: handle exception
		}
		return prueba;
	}

	@GetMapping("/clientes/regiones")
	public ResponseEntity<?> findAllRegiones() {
		List<Region> data = null;
		Map<String, Object> response = new HashMap<>();
		try {
			data = regionService.findAll();
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("regiones", data);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
}
