import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductComponent} from './product.component';
import {provideRouter} from '@angular/router';
import {Paths, routes} from '../../app.routes';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ProductService} from '../../../data/services/product.service';
import {FormControl} from '@angular/forms';
import {Product} from '../../../domain/models/product';
import {throwError} from 'rxjs';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: ProductService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComponent, HttpClientTestingModule],
      providers: [provideRouter(routes), {
        provide: ProductService,
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize in create mode', () => {
    expect(component.isModifyMode).toBeFalsy();
  });

  it('should have a form group with all fields', () => {
    const controls = component.productForm.controls;
    expect(controls).toEqual(
      expect.objectContaining({
        id: expect.any(FormControl),
        logo: expect.any(FormControl),
        name: expect.any(FormControl),
        description: expect.any(FormControl),
        releaseDate: expect.any(FormControl),
        restructuringDate: expect.any(FormControl),
      })
    );
  });

  it('should mark required fields as invalid when empty', () => {
    const nameControl = component.productForm.get('name');
    nameControl?.setValue('');
    nameControl?.markAsTouched();
    fixture.detectChanges();

    expect(nameControl?.invalid).toBeTruthy();
    expect(nameControl?.hasError('required')).toBeTruthy();
  });

  it('should reset form to initial product in create mode', () => {
    const initialProduct = new Product();
    component.product = new Product();
    component.reset();

    expect(component.product).toEqual(initialProduct);
    expect(component.productForm.value).toEqual(initialProduct);
  });
  it('should mark releaseDate as invalid if date is in the past', () => {
    const releaseDateControl = component.productForm.get('releaseDate');
    releaseDateControl?.setValue(new Date(2023, 11, 31));
    releaseDateControl?.markAsTouched();
    fixture.detectChanges();

    expect(releaseDateControl?.invalid).toBeTruthy();
    expect(releaseDateControl?.hasError('releaseDateInvalid')).toBeTruthy();
  });

  it('toBeTruthy', () => {
    const restructuringDateControl = component.productForm.get('restructuringDate');
    restructuringDateControl?.setValue(new Date(2024, 11, 31));
    restructuringDateControl?.markAsTouched();
    fixture.detectChanges();

    expect(restructuringDateControl?.invalid).toBeTruthy();
    expect(restructuringDateControl?.hasError('restructuringDateInvalid')).toBeTruthy();
  });

  it('should not navigate to home if there is an error during creation', () => {
    component.isModifyMode = false;
    const navigateSpy = jest.spyOn(component.router, 'navigate');

    productService.postProducts = jest.fn().mockReturnValue(throwError(new Error('Error')));
    component.send();

    expect(navigateSpy).not.toHaveBeenCalledWith([Paths.home]);
  });
  it('should reset form on cancel', () => {
    expect(component.productForm.value).toEqual(new Product());
  });
  it('shouldnt set idDuplicate error when ID exists', () => {
    const product = new Product();
    product.id = "1223455";
    product.logo = "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg";
    product.name = "johan castaño";
    product.description = "Macbook123";
    product.releaseDate = "2024-10-13";
    product.restructuringDate = "2025-10-13";
    component.productForm.setValue(product);
    productService.getIdVerification = jest.fn().mockResolvedValue(true);
    component.send();

    expect(component.productForm.get('id')?.hasError('idDuplicate')).toBeFalsy();
  });
  it('should reset product and form to initial state in create mode', () => {
    const initialProduct = new Product();
    const product = new Product();
    product.id = "1223455";
    product.logo = "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg";
    product.name = "johan castaño";
    product.description = "Macbook123";
    product.releaseDate = "2024-10-13";
    product.restructuringDate = "2025-10-13";
    component.productForm.setValue(product);
    component.reset();

    expect(component.product).toEqual(initialProduct);
    expect(component.productForm.value).toEqual(initialProduct);
  });
  it('should reset product to ProductService product in modify mode', () => {
    component.isModifyMode = true;
    const initialProduct = new Product();
    component.productService.product = initialProduct;

    component.reset();

    expect(component.product).toEqual(initialProduct);
  });
});
