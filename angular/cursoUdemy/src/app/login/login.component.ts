import { Component, OnInit } from '@angular/core';
import { Usuario} from '../entities/usuario';
import { AppServiceService } from '../servicios/authService';
import { Router } from '@angular/router';
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
  }

  private login() {
    if (!this.usuario.username || !this.usuario.password) {
      swal('error', 'usuario o clave incorrectos', 'error');
      return;
    }
    this.auth.login(this.usuario).toPromise().then( d => {
      swal('success', `${this.usuario.username} haz inciado sesión correctamente`, 'success');
    });
  }
}
