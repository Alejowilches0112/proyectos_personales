import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlEndPoint: string = 'http://localhost:8080/api'
  private headers;
  constructor(private http: HttpClient) { }

  public get(url:string, content:string) {
    this.headers = new HttpHeaders({'Content-Type':content}); 
    return this.http.get(`${this.urlEndPoint}/${url}`, {headers:this.headers});
  }

  public getId(url:string, id:any, content:string) {
    this.headers = new HttpHeaders({'Content-Type':content}); 
    return this.http.get(`${this.urlEndPoint}/${url}/${id}`,{headers:this.headers});
  }

  public post(url:string, params:Object, content:string){
    this.headers = new HttpHeaders({'Content-Type':content}); 
    return this.http.post(`${this.urlEndPoint}/${url}`,params,{headers:this.headers});
  }

  public put (url:string, id:any, params:Object, content:string){
    this.headers = new HttpHeaders({'Content-Type':content}); 
    return this.http.put(`${this.urlEndPoint}/${url}/${id}`,params, {headers: this.headers});
  }

  public delete(url:string, id:any, content:string){
    this.headers = new HttpHeaders({'Content-Type':content}); 
    return this.http.delete(`${this.urlEndPoint}/${url}/${id}`, {headers: this.headers});
  }
  
}
