import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css',
})

export class MainpageComponent {
  
  constructor(private router: Router) {}

  navigateToRegister(email: string) {
  this.router.navigate(['/register'], { queryParams: { email } });
 }
}