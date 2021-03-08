import { ValidateFieldsService } from './validate-fields.service';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from './input-text/input-text.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputDateComponent } from './input-date/input-date.component';
import { InputSelectComponent } from './input-select/input-select.component';



@NgModule({
  declarations: [
  InputTextComponent,
  InputNumberComponent,
  InputDateComponent,
  InputSelectComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    InputTextComponent,
    InputNumberComponent,
    InputDateComponent,
    InputSelectComponent
  ],
  providers: [
    ValidateFieldsService
  ]
})
export class FieldsModule { }
