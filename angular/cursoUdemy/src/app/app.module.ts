import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './servicios/api.service';
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component';
import {MegaMenuModule} from 'primeng/megamenu';
@NgModule({
  declarations: [
    AppComponent, HeaderComponent, FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MegaMenuModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
