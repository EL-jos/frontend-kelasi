import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBottomSheetComponent } from './student-bottom-sheet.component';

describe('StudentBottomSheetComponent', () => {
  let component: StudentBottomSheetComponent;
  let fixture: ComponentFixture<StudentBottomSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentBottomSheetComponent]
    });
    fixture = TestBed.createComponent(StudentBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
