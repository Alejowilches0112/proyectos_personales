import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppServiceService } from '../servicios/authService';
import swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AppServiceService, private route: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.auth.isAuth()) {

        if (this.isTokenActive()) {
          swal('Sesión Expirada', `${this.auth.usuario.username} su sesión ha expirado`, 'warning');
          this.route.navigate(['/login']);
          return false;
        }
        return true;
        /*const role = next.data.role as string;
        if (this.auth.hasRoles(role)) {
          return true;
        }
        swal('Acceso Denegado', `${this.auth.usuario.username} no tienes acceso`, 'warning');
        return false;*/
      }
      this.route.navigate(['/login']);
      return false;
  }

  isTokenActive() {
    const datos = this.auth.obtenerDatosToken(this.auth.token);
    const now = new Date().getTime() / 1000;
    console.log(now, ' ', datos.exp);
    if (datos.exp > now) {
      return false;
    }
    return true;
  }
}
