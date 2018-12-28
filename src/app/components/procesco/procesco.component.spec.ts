import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcescoComponent } from './procesco.component';

describe('ProcescoComponent', () => {
  let component: ProcescoComponent;
  let fixture: ComponentFixture<ProcescoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcescoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcescoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
