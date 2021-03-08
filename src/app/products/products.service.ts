import { ConfigParamsService } from './../shared/services/config-params.service';
import { ConfigParams } from './../shared/models/config-params';
import { Product } from './../shared/models/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const url = 'http://localhost:3000/products'

@Injectable()
export class ProductsService {

  constructor(private httpClient: HttpClient, private configParamsService: ConfigParamsService) { }

  save(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(url, product);
  }

  update(id: number, product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${url}/${id}`, product);
  }

  get(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${url}/${id}`);
  }

  getList(config: ConfigParams): Observable<Product[]> {
    const configParams = this.configParamsService.requestParams(config);
    return this.httpClient.get<Product[]>(url, { params: configParams });
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${url}/${id}`);
  }
}
