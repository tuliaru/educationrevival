import { TestBed } from '@angular/core/testing';

import { RegisterStudentForClassService } from './register-student-for-class.service';

describe('RegisterStudentForClassService', () => {
  let service: RegisterStudentForClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterStudentForClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
