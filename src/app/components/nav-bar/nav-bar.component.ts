// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-nav-bar',
//   standalone: true,
//   templateUrl: './nav-bar.component.html',
//   styleUrls: ['./nav-bar.component.css']
// })
// export class NavBarComponent {
//   // Add navigation logic here (e.g., links to different pages)
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  username: string | null = null;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.username = this.authService.getSignupData('username');
      } else {
        this.username = null;
      }
    });
  }

  signOut(): void {
    this.authService.setAuthenticated(false); // Update the authentication status in your service
    this.authService.addSignupData('email', '');
    this.authService.addSignupData('password', '');
    this.authService.addSignupData('username', '');
    this.authService.addSignupData('tmdb', '');
    this.authService.addSignupData('plan', '');
    this.router.navigate(['/login']); 
  }
}