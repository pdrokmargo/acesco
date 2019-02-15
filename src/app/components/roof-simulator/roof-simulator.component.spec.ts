import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoofSimulatorComponent } from './roof-simulator.component';

describe('RoofSimulatorComponent', () => {
  let component: RoofSimulatorComponent;
  let fixture: ComponentFixture<RoofSimulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoofSimulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoofSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
