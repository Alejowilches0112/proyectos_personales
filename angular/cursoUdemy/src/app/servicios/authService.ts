import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Usuario } from '../entities/usuario';
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  private urlEndPoint = 'http://localhost:8080/oauth/token';
  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario {
    if (this._usuario !== null) {
      return this._usuario;
    } else if ( this._usuario === null && sessionStorage.getItem('usuario_angularApp') !== null) {
      this._usuario = JSON.parse(atob(sessionStorage.getItem('usuario_angularApp'))) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }
  public get token(): string {
    if (this._token !== null) {
      return this._token;
    } else if ( this._token === null && sessionStorage.getItem('token_angularApp') !== null) {
      this._token = sessionStorage.getItem('token_angularApp');
      return this._token;
    }
    return '';
  }
  public login(usuario: Usuario) {
    const credenciales = btoa('angularapp' + ':' + 'bitacoraAngular');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${credenciales}`
    });
    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    const req = new HttpRequest('POST', `${this.urlEndPoint}`, params.toString(), { headers: httpHeaders , reportProgress: true});
    return this.http.request(req);
  }

  public guardarUsuario(accessToken) {
    const data = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.nombre = data.nombre_usuario;
    this._usuario.apellido = data.apellido_usuario;
    this._usuario.email = data.email_usuario;
    this._usuario.roles = data.authorities;
    sessionStorage.setItem('usuario_angularApp', btoa(JSON.stringify(this._usuario)));
  }

  public guardarToken(accessToken) {
    this._token = accessToken;
    sessionStorage.setItem('token_angularApp', this._token);
  }

  private obtenerDatosToken(accessToken) {
    if (accessToken) {
      return JSON.parse(atob(accessToken).split('.')[1]);
    }
    return null;
  }
}
