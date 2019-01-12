import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageBComponent } from './stage-b.component';

describe('StageBComponent', () => {
  let component: StageBComponent;
  let fixture: ComponentFixture<StageBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
