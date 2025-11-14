import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StreakDetailsPage } from './streak-details.page';

describe('StreakDetailsPage', () => {
  let component: StreakDetailsPage;
  let fixture: ComponentFixture<StreakDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StreakDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
