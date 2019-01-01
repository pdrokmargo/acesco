import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProviderComponent } from './new-provider.component';

describe('NewProviderComponent', () => {
  let component: NewProviderComponent;
  let fixture: ComponentFixture<NewProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
