import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCadastroComponent } from './product-cadastro.component';

describe('ProductCadastroComponent', () => {
  let component: ProductCadastroComponent;
  let fixture: ComponentFixture<ProductCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
