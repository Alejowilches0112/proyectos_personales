import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SelectComponent } from './select.component';
@NgModule({
  declarations: [SelectComponent],
  imports: [
    CommonModule,
    AutoCompleteModule
  ]
})
export class SelectModule { }
