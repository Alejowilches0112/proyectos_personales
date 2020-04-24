import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-CO';
import { ApiService } from './servicios/api.service';
import { AppServiceService } from './servicios/authService';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { TokenInterceptor } from './interceptors/token.interceptors';
import { AuthInterceptor } from './interceptors/auth.interceptors';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DeviceDetectorModule
  ],
  providers: [ApiService, AppServiceService,
              { provide: LOCALE_ID, useValue: 'es'},
              { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
              { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
