import { TestBed } from '@angular/core/testing';
import { emailValidator } from './email-validator.service';

describe('ValidatorService', () => {
  let service: typeof emailValidator;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(emailValidator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
