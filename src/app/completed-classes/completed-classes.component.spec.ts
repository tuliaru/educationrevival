import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedClassesComponent } from './completed-classes.component';

describe('CompletedClassesComponent', () => {
  let component: CompletedClassesComponent;
  let fixture: ComponentFixture<CompletedClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedClassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
