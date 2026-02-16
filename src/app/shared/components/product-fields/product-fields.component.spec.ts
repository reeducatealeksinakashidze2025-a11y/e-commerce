import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFieldsComponent } from './product-fields.component';

describe('ProductFieldsComponent', () => {
  let component: ProductFieldsComponent;
  let fixture: ComponentFixture<ProductFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFieldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFieldsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
