import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerUpdataProductComponent } from './seller-updata-product.component';

describe('SellerUpdataProductComponent', () => {
  let component: SellerUpdataProductComponent;
  let fixture: ComponentFixture<SellerUpdataProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerUpdataProductComponent]
    });
    fixture = TestBed.createComponent(SellerUpdataProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
