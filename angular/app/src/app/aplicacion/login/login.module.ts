import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from  './login.component';
import { MatSidenavModule, MatCardModule, MatGridListModule, MatFormFieldModule, MatInputModule,
  MatButtonModule, MatIconModule } from '@angular/material';
import { LoginRoutingModule } from './login-routing.module'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    MatSidenavModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class LoginModule { }
