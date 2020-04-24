import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppServiceService } from '../servicios/authService';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor( private auth: AppServiceService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((e: any, caught: Observable<HttpEvent<any>>) => {
        console.log(e);
        if (e.status === 401) {
          if (this.auth.isAuth()) {
            this.auth.logout();
          }
          swal('Acceso Deneado', `Favor Inicie Sesión`, 'warning');
        }
        if (e.status === 403) {
          swal('Acceso Deneado', `${this.auth.usuario.username} no tienes acceso a esta página`, 'warning');
        }
        this.router.navigate(['/login']);
        return throwError(e);
      })
    );
  }
}
