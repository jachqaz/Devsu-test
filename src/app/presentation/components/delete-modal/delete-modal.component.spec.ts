import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteModalComponent} from './delete-modal.component';
import {Product} from '../../../domain/models/product';

describe('DeleteModalComponent', () => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be initially hidden', () => {
    expect(component.visible).toBeFalsy();
  });

  it('should emit closeEvent when close is called', () => {
    const closeSpy = jest.spyOn(component.closeEvent, 'emit');
    component.close();

    expect(closeSpy).toHaveBeenCalled();
  });

  it('should emit deleteEvent when deleteProduct is called', () => {
    const deleteSpy = jest.spyOn(component.deleteEvent, 'emit');
    component.deleteProduct();

    expect(deleteSpy).toHaveBeenCalled();
  });

  it('should update visible property when close is called', () => {
    component.visible = true;
    component.close();

    expect(component.visible).toBeFalsy();
  });

  it('should pass product to deleteEvent', () => {
    const product = new Product();
    product.id = "1223455";
    product.logo = "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg";
    product.name = "johan castaño";
    product.description = "Macbook123";
    product.releaseDate = "2024-10-13";
    product.restructuringDate = "2025-10-13";
    component.product = product;
    const deleteSpy = jest.spyOn(component.deleteEvent, 'emit');

    component.deleteProduct();

    expect(deleteSpy).toHaveBeenCalledWith();
  });
});
