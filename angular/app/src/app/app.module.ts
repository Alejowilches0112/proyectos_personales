import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeviceDetectorModule, DeviceDetectorService } from 'ngx-device-detector';
/*Servicios*/ 
import { AutenticacionService } from './servicios/autenticacion.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DeviceDetectorModule
  ],
  providers: [AutenticacionService, DeviceDetectorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
