import {Injectable} from '@angular/core';
import {Product} from '../../domain/models/product';
import {HttpClient} from '@angular/common/http';

export const API_URL = 'http://localhost:3002/bp/products/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product: Product = new Product();

  constructor(private http: HttpClient) {
  }

  async getProducts(): Promise<any> {
    return this.http.get(`${API_URL}`);
  }

  async postProducts(product: Product): Promise<any> {
    return this.http.post(`${API_URL}`, product);
  }

  async putProducts(product: Product): Promise<any> {
    return this.http.put(`${API_URL}/${product.id}`, product);
  }

  async deleteProducts(product: Product): Promise<any> {
    return this.http.delete(`${API_URL}/${product.id}`);
  }

  async getIdVerification(product: Product): Promise<any> {
    return this.http.get(`${API_URL}/verification/${product.id}`);
  }
}
