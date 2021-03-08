import { ProductInfoComponent } from './products/product-info/product-info.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductCadastroComponent } from './products/product-cadastro/product-cadastro.component';
import { ProductHomeComponent } from './products/product-home/product-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', 
    children: [
      { path: '', component: ProductHomeComponent},
      { 
        path: 'cadastro', 
        children: [
          { path: '', component: ProductCadastroComponent },
          { path: ':id', component: ProductCadastroComponent }
        ] 
      },
      { 
        path: 'list',
        children: [
          { path: '', component: ProductListComponent},
          { path: ':id', component: ProductInfoComponent }
        ]
      }
    ] 
  },
  { path: '**', redirectTo: 'products'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
