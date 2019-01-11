import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageAComponent } from './stage-a.component';

describe('StageAComponent', () => {
  let component: StageAComponent;
  let fixture: ComponentFixture<StageAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
