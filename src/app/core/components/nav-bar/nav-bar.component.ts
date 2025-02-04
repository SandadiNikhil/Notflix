import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})

export class NavBarComponent implements OnInit {
  username: string | null = null;
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((status) => {
      this.isAuthenticated = status;
      console.log('isAuthenticated:', status);
      console.log('nav-bar: isAuthenticated:', status);

      if (status) {
        this.username = this.authService.getCurrentUser(); 
        console.log('Logged-in username:', this.username);
      } else {
        this.username = null;
      }
    });
  }

  // ngOnInit(): void {
  //   this.authService.isAuthenticated$.subscribe((status) => {
  //     this.isAuthenticated = status;
  //     console.log('nav-bar: isAuthenticated:', status);
  //   });
  // }

  signOut(): void {
    this.authService.setAuthenticated(false); 
    this.authService.addSignupData('email', '');
    this.authService.addSignupData('password', '');
    this.authService.addSignupData('username', '');
    this.authService.addSignupData('tmdb', '');
    this.authService.addSignupData('plan', '');
    this.router.navigate(['/login']); 
  }
}