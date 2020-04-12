import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
  declarations: [ClientesComponent, FormComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,
    TableModule,
    CalendarModule,
    InputTextModule
  ]
})
export class ClientesModule { }
