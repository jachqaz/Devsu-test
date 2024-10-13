import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ProductService} from '../../../data/services/product.service';
import {By} from '@angular/platform-browser';
import {Paths, routes} from '../../app.routes';
import {Product} from '../../../domain/models/product';
import {provideRouter} from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let productService: ProductService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule],
      providers: [
        provideRouter(routes),
        {
          provide: ProductService,
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
    component.products = [
      {
        "id": "1223455",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "name": "johan castaño",
        "description": "Macbook123",
        "releaseDate": "2024-10-13",
        "restructuringDate": "2025-10-13"
      },
      {
        "id": "1234",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "name": "johan castaño",
        "description": "Macbook123",
        "releaseDate": "2024-10-13",
        "restructuringDate": "2025-10-13"
      }
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProductsService on init', () => {
    const spy = jest.spyOn(component, 'getProductsService');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should filter products based on search', () => {
    component.search = 'johan';
    fixture.detectChanges();

    const filteredProducts = component.getProducts();
    expect(filteredProducts.length).toBe(2);
    expect(filteredProducts[0].name).toBe('johan castaño');
  });

  it('should limit results based on totalResults', () => {
    component.products = [...Array(25).keys()].map(i => component.products[0]);
    component.totalResults = 10;
    fixture.detectChanges();

    const filteredProducts = component.getProducts();
    expect(filteredProducts.length).toBe(10);
  });

  it('should show the delete modal when clicking the delete button', () => {
    fixture.detectChanges();

    const deleteButton = fixture.debugElement.queryAll(By.css('.delete-button'))[0];
    deleteButton.triggerEventHandler('click', {})

    expect(component.showModal).toBe(true);
  });

  it('should call the delete service when confirming deletion', () => {
    const deleteSpy = jest.spyOn(component.productService, 'deleteProducts');

    component.deleteEventModal();

    expect(deleteSpy).toHaveBeenCalledWith(component.productSelected);
  });

  it('should navigate to product modification page on modify call', () => {
    const navigateSpy = jest.spyOn(component.router, 'navigate');
    const productToModify = component.products[0];

    component.modify(productToModify);

    expect(navigateSpy).toHaveBeenCalledWith([Paths.productModify]);
    expect(component.productService.product).toEqual(productToModify);

  });

  it('should navigate to product creation page on add call', () => {
    const navigateSpy = jest.spyOn(component.router, 'navigate');

    component.add();

    expect(navigateSpy).toHaveBeenCalledWith([Paths.productCreate]);
    expect(component.productService.product).toEqual(new Product());
  });

  it('should hide the delete modal on closeModal call', () => {
    component.showModal = true;

    component.closeModal();

    expect(component.showModal).toBe(false);
  });

  it('should return all products if search is empty', () => {
    component.search = '';

    const allProducts = component.getProducts();

    expect(allProducts).toEqual(component.products);
  });
});
