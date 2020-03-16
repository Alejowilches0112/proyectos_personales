import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AplicacionComponent } from './aplicacion.component';
import { AplicacionRoutingModule } from './aplicacion-routing.module';
import { MatToolbarModule, MatMenuModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [AplicacionComponent],
  imports: [
    CommonModule,
    AplicacionRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class AplicacionModule { }
