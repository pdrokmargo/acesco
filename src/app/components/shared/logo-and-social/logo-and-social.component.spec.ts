import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoAndSocialComponent } from './logo-and-social.component';

describe('LogoAndSocialComponent', () => {
  let component: LogoAndSocialComponent;
  let fixture: ComponentFixture<LogoAndSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoAndSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoAndSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
