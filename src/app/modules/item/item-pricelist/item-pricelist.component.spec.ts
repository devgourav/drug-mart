import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPricelistComponent } from './item-pricelist.component';

describe('ItemPricelistComponent', () => {
  let component: ItemPricelistComponent;
  let fixture: ComponentFixture<ItemPricelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPricelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPricelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
