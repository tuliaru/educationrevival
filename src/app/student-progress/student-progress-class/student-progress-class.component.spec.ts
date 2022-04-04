import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgressClassComponent } from './student-progress-class.component';

describe('StudentProgressClassComponent', () => {
  let component: StudentProgressClassComponent;
  let fixture: ComponentFixture<StudentProgressClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentProgressClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProgressClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
