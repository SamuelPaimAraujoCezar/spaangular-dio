import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfigParams } from './../../shared/models/config-params';
import { AlertComponent } from './../../shared/components/alert/alert.component';
import { Alert } from './../../shared/models/alert';
import { Product } from './../../shared/models/product';
import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'spa-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  config: ConfigParams = {
    page: 0,
    limit: 25
  };
  configFullList: ConfigParams = {}

  products: Product[] = [];
  fullList: Product[] = [];

  displayedColumns = ['nome', 'empresa', 'categoria', 'precoCompra', 'precoVenda', 'qtdEstoque', 'dataVencimento', 'action'];
  pageSizes: Array<number> = [5, 10, 25, 100, 200];
  filterList: FormGroup;

  constructor(public dialog: MatDialog, private productsService: ProductsService, private router: Router,
              private fb: FormBuilder) { }


  ngOnInit(): void {
    this.filterList = this.fb.group({
      query: [''],
      pageSize: ['']
    })

    this.filterList.get('query').valueChanges.pipe(debounceTime(400)).subscribe((query: string) => {
      this.config.query = query;
      this.configFullList.query = query;
      this.resetData();
    })

    this.filterList.get('pageSize').valueChanges.subscribe((size: number) => {
      this.config.limit = size;
      this.resetData();
    })

    this.loadPage(1);
  }

  edit(id: number): void {
    this.router.navigate(['/products/cadastro', id]);
  }

  info(id: number): void {
    this.router.navigate(['/products/list', id]);
  }

  delete(product: Product): void {
     const config = {
       data: {
         titulo: 'Você tem certeza que deseja deletar?',
         descricao: `Caso você tenha certeza que deseja deletar o produto \n'${product.nome}', clique no botão OK`,
         corBtnSucesso: 'warn',
         corBtnCancelar: 'accent',
         possuirBtnFechar: true
       } as Alert
     }; 
     const dialogRef = this.dialog.open(AlertComponent, config);
     dialogRef.afterClosed().subscribe((option: boolean) => {
       if(option) {
        this.productsService.delete(product.id).subscribe(() => {
          if(this.products.length === 1 && this.config.page > 1) {
            this.loadPage(-1);
          } else {
            this.loadPage(0);
          }
        },
        () => {
          const config = {
            data: {
              titulo: 'Erro ao deletar o produto!',
              descricao: 'Não foi possível deletar o produto, tente novamente mais tarde',
              corBtnSucesso: 'warn'
            } as Alert
          };
          this.dialog.open(AlertComponent, config);
        });
       }
     });
  }

  loadPage(pageCounter: number): void {
    this.config.page += pageCounter;
    this.loadData();
    this.setFullList();
  }

  private loadData(): void {
    this.productsService.getList(this.config).subscribe((products: Product[]) => this.products = products,
    () => {
      const config = {
        data: {
          titulo: 'Erro ao listar produtos!',
          descricao: 'Não foi possível listar os produtos, tente novamente mais tarde',
          corBtnSucesso: 'warn'
        } as Alert
      };
      const dialogRef = this.dialog.open(AlertComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigate(['/products']));
    });
  }

  private resetData(): void {
    this.config.page = 0;
    this.products = [];
    this.loadPage(1);
  }

  private setFullList(): void {
    this.productsService.getList(this.configFullList)
      .subscribe((fullList: Product[]) => this.fullList = fullList);
  }

}
