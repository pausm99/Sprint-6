import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('FormComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be a number', () => {
    expect(component.totalPrice).not.toBeNaN();
  });

  it('should be a number', () => {
    expect(component.webPrice).not.toBeNaN();
  });

  it('should be a number', () => {
    expect(component.initialPrice).not.toBeNaN();
  });

  it('should be a number after updatePrice', () => {
    component.updatePrice();
    expect(component.totalPrice).not.toBeNaN();
  });
});
