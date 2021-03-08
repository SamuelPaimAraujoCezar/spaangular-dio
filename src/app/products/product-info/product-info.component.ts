import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from './../products.service';
import { Product } from './../../shared/models/product';
import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/shared/models/alert';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'spa-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  id: number;
  product: Product;

  constructor(private productsService: ProductsService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productsService.get(this.id).subscribe((product: Product) => this.product = product,
    () => {
      const config = {
        data: {
          titulo: 'Erro ao carregar o produto!',
          descricao: 'Não foi carregar o produto, tente novamente mais tarde',
          corBtnSucesso: 'warn'
        } as Alert
      };
      this.dialog.open(AlertComponent, config);
    });
  }

}
