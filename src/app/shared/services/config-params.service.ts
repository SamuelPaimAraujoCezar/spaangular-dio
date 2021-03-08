import { ConfigParams } from './../models/config-params';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }

  requestParams(config: ConfigParams): HttpParams {
    let httpParams = new HttpParams();
    if(config.page) {
      httpParams = httpParams.set('_page', config.page.toString());
    }
    if(config.limit) {
      httpParams = httpParams.set('_limit', config.limit.toString());
    }
    if(config.query) {
      httpParams = httpParams.set('q', config.query)
    }
    httpParams = httpParams.set('_sort', 'categoria');
    httpParams = httpParams.set('order', 'asc');

    return httpParams;
  }
}
