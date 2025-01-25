import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnePage } from './one.page';

describe('OnePage', () => {
  let component: OnePage;
  let fixture: ComponentFixture<OnePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
