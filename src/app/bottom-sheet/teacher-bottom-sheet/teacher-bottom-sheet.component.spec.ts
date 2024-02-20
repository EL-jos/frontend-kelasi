import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherBottomSheetComponent } from './teacher-bottom-sheet.component';

describe('TeacherBottomSheetComponent', () => {
  let component: TeacherBottomSheetComponent;
  let fixture: ComponentFixture<TeacherBottomSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherBottomSheetComponent]
    });
    fixture = TestBed.createComponent(TeacherBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
