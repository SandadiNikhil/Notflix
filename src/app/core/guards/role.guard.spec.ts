import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';
import { RoleGuard } from './role.guard';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserRole']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(RoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access for "SUPERUSER" or "ADMIN"', () => {
    authServiceSpy.getUserRole.and.returnValue('ADMIN');
    expect(guard.canActivate(null as any, null as any)).toBeTrue();
  });

  it('should deny access and redirect if role is "USER"', () => {
    authServiceSpy.getUserRole.and.returnValue('USER');
    expect(guard.canActivate(null as any, null as any)).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/role']);
  });
});
