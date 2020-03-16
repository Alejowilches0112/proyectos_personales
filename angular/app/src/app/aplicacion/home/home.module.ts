import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MenuComponent } from '../personalizados/menu/menu.component'
import { HomeComponent } from './home.component'
import { MatToolbarModule, MatMenuModule, MatIconModule, MatSidenavModule } from '@angular/material';

@NgModule({
  declarations: [HomeComponent,MenuComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatToolbarModule, 
    MatMenuModule, 
    MatIconModule,
    MatSidenavModule
  ]
})
export class HomeModule { }
