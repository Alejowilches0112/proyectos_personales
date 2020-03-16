import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public hide = true;
  public itemsMenu = [];
  constructor(private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.itemsMenu = [
      {
        icon: 'settings',
        name: 'Administrar Sistema',
        link: '/administrar',
      },
      {
        icon: 'local_activity',
        name: 'Registro de Actividades',
        link: '/actividades',
      }
    ];
  }
}
