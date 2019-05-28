import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaPinturasComponent } from './sistema-pinturas.component';

describe('SistemaPinturasComponent', () => {
  let component: SistemaPinturasComponent;
  let fixture: ComponentFixture<SistemaPinturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SistemaPinturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SistemaPinturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
