import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseBottomSheetComponent } from './classe-bottom-sheet.component';

describe('ClasseBottomSheetComponent', () => {
  let component: ClasseBottomSheetComponent;
  let fixture: ComponentFixture<ClasseBottomSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClasseBottomSheetComponent]
    });
    fixture = TestBed.createComponent(ClasseBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
