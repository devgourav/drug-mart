import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailsComponent } from './item-details.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { Router } from '@angular/router';
import { ItemService } from 'src/app/core/service/item.service';
import { MockItemService } from 'src/app/core/service/mock-item.service';


describe('ItemDetailsComponent', () => {
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ HttpClientModule,RouterTestingModule ],
      declarations: [ ItemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.overrideComponent(ItemDetailsComponent,{set:{
      providers: [
        {provide: Router, useClass:Router},
        {provide: ItemService, useClass:MockItemService}
      ]
    }})
    fixture = TestBed.createComponent(ItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
