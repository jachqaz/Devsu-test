import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../../common/header/header.component';
import {Product} from '../../../domain/models/product';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Paths} from '../../app.routes';
import {ProductService} from '../../../data/services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  totalResults: number = 0;
  products: Product[] = [];
  productsPage: Product[] = [];
  search: string = '';

  constructor(private router: Router, private productService: ProductService) {
  }
  ngOnInit(): void {
    this.productService.getProducts().then((products) => {
      this.products = products.data;
    }).catch(error => {
      console.error(error)
      alert(error.message);
    });
  }

  modify(product: Product) {
    this.productService.product = product;
    this.router.navigate([Paths.productModify]);
  }

  delete(product: Product) {

  }

  getProducts() {
    if (this.products.length == 0) {
      return [];
    }
    this.productsPage = this.products.filter(product => product.name.includes(this.search));
    if (this.totalResults != 0) {
      this.productsPage = this.productsPage.slice(0, this.totalResults);
    }
    if (this.productsPage.length != this.products.length) {
      return this.productsPage;
    }
    return this.products;
  }

  add() {
    this.productService.product = new Product();
    this.router.navigate([Paths.productCreate]);
  }

}
