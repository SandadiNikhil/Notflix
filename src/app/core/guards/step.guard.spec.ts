import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StepGuard } from './step.guard';
import { AuthService } from '../services/authentication/auth.service';

describe('StepGuard', () => {
  let guard: StepGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserRole']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        StepGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
    guard = TestBed.inject(StepGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
