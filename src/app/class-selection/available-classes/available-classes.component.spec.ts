import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableClassesComponent } from './available-classes.component';

describe('AvailableClassesComponent', () => {
  let component: AvailableClassesComponent;
  let fixture: ComponentFixture<AvailableClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableClassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
