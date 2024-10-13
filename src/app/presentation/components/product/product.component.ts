import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../../common/header/header.component';
import {ProductService} from '../../../data/services/product.service';
import {Product} from '../../../domain/models/product';
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Paths} from '../../app.routes';
import {ActivatedRoute, Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  isModifyMode: boolean = false;
  product: Product = new Product();
  productForm: FormGroup = this.initFormGroup();

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService) {
    this.product = this.productService.product;
  }

  ngOnInit(): void {
    this.isModifyMode = this.route.snapshot.data['isModifyMode'];
    if (this.isModifyMode && this.product.id == "") {
      this.router.navigate([Paths.home]);
    }
  }

  reset() {
    if (this.isModifyMode) {
      this.product = this.productService.product;
    } else {
      this.product = new Product();
    }
    this.productForm = this.initFormGroup();
  }

  send() {
    if (this.isModifyMode) {
      this.productService.putProducts(this.product).then(() => {
        this.router.navigate([Paths.home])
      }).catch(error => {
        console.error(error)
        alert(error.message);
      });
    } else {
      this.productService.getIdVerification(this.product.id).then((value: boolean) => {
        if (value) {
          this.productForm.get('id')?.setErrors({idDuplicate: true});
        } else {
          this.productService.postProducts(this.product).then(() => {
            this.router.navigate([Paths.home])
          }).catch(error => {
            console.error(error)
            alert(error.message);
          });
        }
      }).catch(error => {
        console.error(error)
        alert(error.message);
      });
    }
  }

  initFormGroup() {
    return new FormGroup({
      id: new FormControl(this.isModifyMode ? this.product.id : ''),
      logo: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      releaseDate: new FormControl('', [
        Validators.required,
        (control: AbstractControl) => {
          {
            const fechaActual = new Date();
            const fechaControl = new Date(control.value);
            fechaControl.setDate(fechaControl.getDate() + 1);
            fechaActual.setHours(fechaControl.getHours(),
              fechaControl.getMinutes(),
              fechaControl.getSeconds(),
              fechaControl.getMilliseconds());
            return fechaControl >= fechaActual ? null : {releaseDateInvalid: true};
          }
        }
      ]),
      restructuringDate: new FormControl('', [
        Validators.required,
        (control: AbstractControl) => {
          {
            const fechaActual = new Date();
            const fechaControl = new Date(control.value);
            fechaControl.setDate(fechaControl.getDate() + 1);
            fechaActual.setFullYear(fechaActual.getFullYear() + 1);
            fechaActual.setHours(fechaControl.getHours(),
              fechaControl.getMinutes(),
              fechaControl.getSeconds(),
              fechaControl.getMilliseconds());
            return fechaControl >= fechaActual ? null : {restructuringDateInvalid: true};
          }
        }
      ]),
    });
  }
}
