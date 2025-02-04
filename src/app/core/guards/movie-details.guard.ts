import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userRole = this.authService.getUserRole();
    if (userRole === 'User') {
      this.router.navigate(['/role']);
      return false;
    }
    return true;
  }
}