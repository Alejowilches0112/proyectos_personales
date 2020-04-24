import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
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

  public get(url: string, content: string, Authorization: string) {
    this.headers = new HttpHeaders({'Content-Type': content/*, 'Authorization': `Bearer  ${Authorization}`*/});
    const req = new HttpRequest('GET', `${this.urlEndPoint}/${url}`, {headers: this.headers, reportProgress: true});
    return this.http.request(req);
  }

  public getId(url: string, id: any, content: string, Authorization: string): Observable<HttpEvent<any>> {
    this.headers = new HttpHeaders({'Content-Type': content/*, 'Authorization': `Bearer  ${Authorization}`*/});
    const req = new HttpRequest('GET', `${this.urlEndPoint}/${url}/${id}`, {headers: this.headers , reportProgress: true});
    return this.http.request(req);
  }

  public post(url: string, params, content: string, Authorization: string) {
    this.headers = new HttpHeaders({'Content-Type': content/*, 'Authorization': `Bearer  ${Authorization}`*/});
    const req = new HttpRequest('POST', `${this.urlEndPoint}/${url}`, params, {headers: this.headers , reportProgress: true});
    return this.http.request(req);
  }

  public put(url: string, id: any, params, content: string, Authorization: string) {
    this.headers = new HttpHeaders({'Content-Type': content/*, 'Authorization': `Bearer  ${Authorization}`*/});
    const req = new HttpRequest('PUT', `${this.urlEndPoint}/${url}/${id}`, params, {headers: this.headers , reportProgress: true});
    return this.http.request(req);
  }

  public delete(url: string, id: any, content: string, Authorization: string) {
    this.headers = new HttpHeaders({'Content-Type': content/*, 'Authorization': `Bearer  ${Authorization}`*/});
    const req = new HttpRequest('DELETE', `${this.urlEndPoint}/${url}/${id}`, {headers: this.headers , reportProgress: true});
    return this.http.request(req);
  }

  public upload(url: string, params, Authorization: string) {
    /*this.headers = new HttpHeaders({'Authorization': `Bearer  ${Authorization}`});*/
    const req = new HttpRequest('POST', `${this.urlEndPoint}/${url}`, params, {/*headers: this.headers ,*/ reportProgress: true});
    return this.http.request(req);
  }
}
