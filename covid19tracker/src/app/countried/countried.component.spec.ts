import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriedComponent } from './countried.component';

describe('CountriedComponent', () => {
  let component: CountriedComponent;
  let fixture: ComponentFixture<CountriedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountriedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
