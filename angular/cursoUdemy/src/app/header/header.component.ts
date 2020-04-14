import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../servicios/authService';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public item = [];
  constructor(private auth: AppServiceService, private route: Router) { }

  ngOnInit() {}

  public logout() {
    this.auth.logout();
    this.route.navigate([ ' /login ' ]);
    swal('Cirre de Sesión', 'Ha cerrado sesión correctamente', 'success');
  }

}
