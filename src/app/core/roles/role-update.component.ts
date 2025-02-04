import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/authentication/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-role-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.css'],
})

export class RoleUpdateComponent {
  roles = ['Basic', 'Standard', 'Premium'];
  selectedRole : string;  

  constructor(private authService: AuthService, private router: Router) {
    this.selectedRole = this.mapRoleToUi(this.authService.getUserRole());
  }

  private mapRoleToUi(role: string): string {
    switch (role) {
      case 'SUPERUSER': 
        return 'Standard';
      case 'ADMIN': 
        return 'Premium';
      case 'USER': 
      default:
        return 'Basic';
    }
  }

  private mapUiToBackend(uiRole: string): string {
    switch (uiRole) {
      case 'Standard': 
        return 'SUPERUSER';
      case 'Premium': 
        return 'ADMIN';
      case 'Basic': 
      default:
        return 'USER';
    }
  }

  selectPlan(uiRole: string): void {
    this.selectedRole = uiRole;
  }

  submit(): void {
    const backendRole = this.mapUiToBackend(this.selectedRole);
    this.authService.updateUserCredentials({ role: backendRole }).subscribe({
      next: (response) => {
        console.log('Role updated successfully:', response);
        this.router.navigate(['/movieList']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Failed to update role:', err);
      },
    });
  }
}
