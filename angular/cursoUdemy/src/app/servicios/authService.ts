import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Usuario } from '../entities/usuario';
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  private urlEndPoint = 'http://localhost:8080/oauth/token';
  private credenciales = btoa('angularapp:bitacoraAngular');
  private headers;
  constructor(private http: HttpClient) { }

  public login(usuario: Usuario) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded','Authorization': `Basic ${this.credenciales}`});
    console.log(this.headers);
    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    console.log(params.toString());
    return  this.http.post( this.urlEndPoint, params.toString() , {headers: this.headers});
  }
}
