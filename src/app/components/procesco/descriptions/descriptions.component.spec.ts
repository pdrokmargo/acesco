import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionsComponent } from './descriptions.component';

describe('DescriptionsComponent', () => {
  let component: DescriptionsComponent;
  let fixture: ComponentFixture<DescriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
