import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseSingleComponent } from './classe-single.component';

describe('ClasseSingleComponent', () => {
  let component: ClasseSingleComponent;
  let fixture: ComponentFixture<ClasseSingleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClasseSingleComponent]
    });
    fixture = TestBed.createComponent(ClasseSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
