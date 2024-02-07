import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Products } from '../interfaces/types';

@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  constructor(private readonly apiService: ApiService) {
    console.log('ProductsService :>> ');
  }

  // Getting products from the API
  getProducts = (
    url: string,
    params?: any
  ): Observable<Products> => {
    return this.apiService.get(url);
  };

  // Adding a product via the API
  addProduct = (url: string, body: any): Observable<any> => {
    return this.apiService.post(url, body, {});
  };

  // Editing a product via the API
  editProduct = (url: string, body: any): Observable<any> => {
    return this.apiService.put(url, body, {});
  };

  // Deleting a product via the API
  deleteProduct = (url: string): Observable<any> => {
    return this.apiService.delete(url, {});
  };
}