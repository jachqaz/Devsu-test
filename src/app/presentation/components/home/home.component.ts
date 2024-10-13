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
    var product: Product;
    product = new Product();
    product.id = "111";
    product.logo = "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg";
    product.name = "B";
    product.description = "description";
    product.releaseDate = "2001-01-01";
    product.restructuringDate = "2001-01-01";
    this.products.push(product);
    product = new Product();
    product.id = "111";
    product.logo = "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg";
    product.name = "BA";
    product.description = "description";
    product.releaseDate = "2001-01-01";
    product.restructuringDate = "2001-01-01";
    this.products.push(product);
    product = new Product();
    product.id = "111";
    product.logo = "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg";
    product.name = "BAN";
    product.description = "description";
    product.releaseDate = "2001-01-01";
    product.restructuringDate = "2001-01-01";
    this.products.push(product);
    product = new Product();
    product.id = "111";
    product.logo = "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg";
    product.name = "BANC";
    product.description = "description";
    product.releaseDate = "2001-01-01";
    product.restructuringDate = "2001-01-01";
    this.products.push(product);
    product = new Product();
    product.id = "111";
    product.logo = "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg";
    product.name = "BANCO";
    product.description = "description";
    product.releaseDate = "2001-01-01";
    product.restructuringDate = "2001-01-01";
    this.products.push(product);
    product = new Product();
    product.id = "111";
    product.logo = "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg";
    product.name = "BANCOJ";
    product.description = "description";
    product.releaseDate = "2001-01-01";
    product.restructuringDate = "2001-01-01";
    this.products.push(product);
    product.id = "111";
    product.logo = "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg";
    product.name = "name";
    product.description = "description";
    product.releaseDate = "2001-01-01";
    product.restructuringDate = "2001-01-01";
    this.products.push(product);
    this.products.push(product);
    this.products.push(product);
    this.products.push(product);
    this.products.push(product);
    this.products.push(product);
    this.products.push(product);
    this.products.push(product);
    this.products.push(product);
    this.products.push(product);
    this.products.push(product);
    this.products.push(product);
    this.products.push(product);
    this.products.push(product);
    this.products.push(product);
    this.products.push(product);
    this.products.push(product);
    this.products.push(product);
    this.products.push(product);
  }

  modify(product: Product) {
    this.productService.product = product;
    this.router.navigate([Paths.productModify]);
  }

  delete(product: Product) {

  }

  getproducts() {
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
