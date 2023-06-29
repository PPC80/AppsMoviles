import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditActivityPage } from './edit-activity.page';

describe('EditActivityPage', () => {
  let component: EditActivityPage;
  let fixture: ComponentFixture<EditActivityPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
