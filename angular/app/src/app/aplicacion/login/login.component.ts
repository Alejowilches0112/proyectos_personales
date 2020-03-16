import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacionService } from '../../servicios/autenticacion.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public perfil = '';
  public hide = true;
  public loginForm: FormGroup;
  public userData :any;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private auth: AutenticacionService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
        ]
      ]
    });
  }
  public onSubmit(valid){
   this.userData = this.saveUserData();
   this.auth.validaUsuario(this.userData);
  }
  public changePerfil(profile){
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
        ]
      ]
    });
    this.perfil = profile;
  }
  saveUserData() {
    const saveUserData = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value,
      perfil: this.perfil
    };
    return saveUserData;
  }
}
