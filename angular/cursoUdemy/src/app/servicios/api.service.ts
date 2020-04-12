import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlEndPoint = 'http://localhost:8080/api';
  private credenciales = btoa('angularapp:bitacoraAngular');
  private headers;
  constructor(private http: HttpClient,
              private router: Router) { }

  public get(url: string, content: string) {
    this.headers = new HttpHeaders({ 'Content-Type': content, /* 'Authorization': `Basic ${this.credenciales}` */});
    const req = new HttpRequest('GET', `${this.urlEndPoint}/${url}`, {headers: this.headers, reportProgress: true});
    return this.http.request(req);
  }

  public getId(url: string, id: any, content: string) {
    this.headers = new HttpHeaders({ 'Content-Type': content });
    const req = new HttpRequest('GET', `${this.urlEndPoint}/${url}/${id}`, {headers: this.headers , reportProgress: true});
    return this.http.request(req);
  }

  public post(url: string, params, content: string) {
    this.headers = new HttpHeaders({ 'Content-Type': content });
    const req = new HttpRequest('POST', `${this.urlEndPoint}/${url}`, params, {headers: this.headers , reportProgress: true});
    return this.http.request(req);
  }

  public put(url: string, id: any, params, content: string) {
    this.headers = new HttpHeaders({ 'Content-Type': content });
    const req = new HttpRequest('PUT', `${this.urlEndPoint}/${url}/${id}`, params, {headers: this.headers , reportProgress: true});
    return this.http.request(req);
  }

  public delete(url: string, id: any, content: string) {
    this.headers = new HttpHeaders({ 'Content-Type': content });
    const req = new HttpRequest('DELETE', `${this.urlEndPoint}/${url}/${id}`, {headers: this.headers , reportProgress: true});
    return this.http.request(req);
  }

  public upload(url: string, params) {
    const req = new HttpRequest('POST', `${this.urlEndPoint}/${url}`, params, {reportProgress: true});
    return this.http.request(req);
  }
}
