import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseBottomSheetComponent } from './course-bottom-sheet.component';

describe('CourseBottomSheetComponent', () => {
  let component: CourseBottomSheetComponent;
  let fixture: ComponentFixture<CourseBottomSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseBottomSheetComponent]
    });
    fixture = TestBed.createComponent(CourseBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
