import { AlertComponent } from './../../shared/components/alert/alert.component';
import { Alert } from './../../shared/models/alert';
import { Product } from './../../shared/models/product';
import { ProductsService } from './../products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'spa-product-cadastro',
  templateUrl: './product-cadastro.component.html',
  styleUrls: ['./product-cadastro.component.scss']
})
export class ProductCadastroComponent implements OnInit {

  id: number;
  product: FormGroup;
  isUpdate: boolean = false;
  rightButton: string = 'Voltar para a página inicial';

  constructor(public dialog: MatDialog, private fb: FormBuilder, private productsService: ProductsService, 
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadForm();
  }

  submit(): void {
    this.product.markAllAsTouched();
    if (this.product.invalid) {
      return;
    }

    const product = this.product.getRawValue() as Product;
    if(this.id) {
      product.id = this.id;
      this.update(this.id, product);
    } else {
      this.save(product);
    }
  }

  resetForm(): void {
    this.product.reset();
  }

  goBack(): void {
    if(this.isUpdate) {
      this.router.navigate(['/products/list']);
    } else {
      this.router.navigate(['/products']);
    }
  }

  private createForm(product: Product): void {
    this.product = this.fb.group({
      nome: [product.nome, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      empresa: [product.empresa, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      categoria: [product.categoria, [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      precoCompra: [product.precoCompra, [Validators.required, Validators.min(0)]],
      precoVenda: [product.precoVenda, [Validators.required, Validators.min(0)]],
      qtdEstoque: [product.qtdEstoque, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
      dataVencimento: [product.dataVencimento]
    })
  }

  private createEmptyProduct(): Product {
    return {
      id: null,
      nome: null,
      empresa: null,
      categoria: null,
      precoCompra: null,
      precoVenda: null,
      qtdEstoque: null,
      dataVencimento: null
    } as Product;
  }

  private loadForm(): void {
    if(this.id) {
      this.isUpdate = true;
      this.rightButton = 'Voltar para a listagem';
      this.productsService.get(this.id).subscribe((product: Product) => this.createForm(product),
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
    } else {
      this.createForm(this.createEmptyProduct());
    }
  }

  private save(product: Product): void {
    this.productsService.save(product).subscribe(() => {
      const config = {
        data: {
          descricao: 'Produto cadastrado com sucesso!',
          btnSucesso: 'Ir para a página inicial',
          btnCancelar: 'Cadastrar outro produto',
          corBtnSucesso: 'primary',
          corBtnCancelar: 'accent',
          possuirBtnFechar: true
        } as Alert
      };
      const dialogRef = this.dialog.open(AlertComponent, config);
      dialogRef.afterClosed().subscribe((option: boolean) => {
        if(option) {
          this.router.navigate(['/products']);
        } else {
          this.resetForm();
        }
      })
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao salvar produto!',
          descricao: 'Não foi possível salvar o seu produto, tente novamente mais tarde',
          corBtnSucesso: 'warn'
        } as Alert
      };
      this.dialog.open(AlertComponent, config);
    });
  }

  private update(id: number, product: Product): void {
    this.productsService.update(id, product).subscribe(() => {
      const config = {
        data: {
          descricao: 'Produto atualizado com sucesso!',
          btnSucesso: 'Ir para a página inicial',
          btnCancelar: 'Voltar para a listagem',
          corBtnSucesso: 'primary',
          corBtnCancelar: 'accent',
          possuirBtnFechar: true
        } as Alert
      };
      const dialogRef = this.dialog.open(AlertComponent, config);
      dialogRef.afterClosed().subscribe((option: boolean) => {
        if (option) {
          this.router.navigate(['/products']);
        } else {
          this.router.navigate(['/products/list']);
        }
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao editar produto!',
          descricao: 'Não foi possível atualizar o seu produto, tente novamente mais tarde',
          corBtnSucesso: 'warn'
        } as Alert
      };
      this.dialog.open(AlertComponent, config);
    });
  }

}
