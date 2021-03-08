import { RouterModule } from '@angular/router';
import { ProductsService } from './products.service';
import { FieldsModule } from './../shared/components/fields/fields.module';
import { HeaderComponent } from './../shared/components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductCadastroComponent } from './product-cadastro/product-cadastro.component';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductInfoComponent } from './product-info/product-info.component';



@NgModule({
  declarations: [
    ProductListComponent, 
    ProductHomeComponent, 
    ProductCadastroComponent,
    HeaderComponent,
    ProductInfoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FieldsModule,
    RouterModule
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
