import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItemComponent } from './new-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MockItemService } from 'src/app/core/service/mock-item.service';
import { ItemService } from 'src/app/core/service/item.service';



describe('NewItemComponent', () => {
  let component: NewItemComponent;
  let fixture: ComponentFixture<NewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,ReactiveFormsModule,RouterTestingModule,HttpClientModule ],
      declarations: [ NewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.overrideComponent(NewItemComponent,{set:{
      providers: [
        {provide: Location, useClass:Location},
        {provide: ItemService, useClass:MockItemService}
        ]
    }})
    fixture = TestBed.createComponent(NewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
