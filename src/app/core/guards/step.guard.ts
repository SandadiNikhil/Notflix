import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { RegisterService } from '../services/register/register.service';

@Injectable({
  providedIn: 'root',
})
export class StepGuard implements CanActivate {
  constructor(private registerService: RegisterService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const step = route.routeConfig?.path; 
    const formData = this.registerService.getFormData();

    if (step === 'step2' && (!formData.email || !formData.password)) {
      console.warn('Redirecting to Step 1: Step 2 requires Step 1 to be completed.');
      this.router.navigate(['/register/step1']);
      return false;
    }

    if (step === 'step3' && (!formData.username || !formData.tmdbKey)) {
      console.warn('Redirecting to Step 2: Step 3 requires Step 2 to be completed.');
      this.router.navigate(['/register/step2']);
      return false;
    }

    return true; 
  }
}
