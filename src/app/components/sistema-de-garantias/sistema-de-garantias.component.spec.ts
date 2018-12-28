import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaDeGarantiasComponent } from './sistema-de-garantias.component';

describe('SistemaDeGarantiasComponent', () => {
  let component: SistemaDeGarantiasComponent;
  let fixture: ComponentFixture<SistemaDeGarantiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SistemaDeGarantiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SistemaDeGarantiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
