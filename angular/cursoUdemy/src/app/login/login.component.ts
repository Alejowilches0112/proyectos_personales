import { Component, OnInit } from '@angular/core';
import { Usuario} from '../entities/usuario';
import { AppServiceService } from '../servicios/authService';
import { Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public pass = 'password';
  public titulo = 'Ingreso al Sistema';
  usuario: Usuario;
  constructor(private auth: AppServiceService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if (this.auth.isAuth()) {
      this.router.navigate([ '/clientes' ]);
    }
  }

  public login() {
    if (!this.usuario.username || !this.usuario.password) {
      swal('Acceso Denegado', 'Usuario o Contraseña vacíos!', 'error');
      return;
    }
    this.auth.login(this.usuario).toPromise().then( d => {
      if (d.type === HttpEventType.Response) {
        const response: any = d.body;
        this.auth.guardarUsuario(response.access_token);
        this.auth.guardarToken(response.access_token);
        this.router.navigate([ '/clientes' ]);
      } else {
        console.log(d);
      }
    }, err => {
      if ( err.status === 400) {
        swal('Acceso Denegado', `Usuario o Contraseña incorrectos.`, 'error');
      }
    });
  }
}
