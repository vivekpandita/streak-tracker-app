import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddStreakPage } from './add-streak.page';

describe('AddStreakPage', () => {
  let component: AddStreakPage;
  let fixture: ComponentFixture<AddStreakPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStreakPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
