import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCourseBottomSheetComponent } from './teacher-course-bottom-sheet.component';

describe('TeacherCourseBottomSheetComponent', () => {
  let component: TeacherCourseBottomSheetComponent;
  let fixture: ComponentFixture<TeacherCourseBottomSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherCourseBottomSheetComponent]
    });
    fixture = TestBed.createComponent(TeacherCourseBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
