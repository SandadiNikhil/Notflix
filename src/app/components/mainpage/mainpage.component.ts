import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  standalone: false,

  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css',
})

export class MainpageComponent {
  // ...

  constructor(private router: Router) {}

  navigateToRegister(event: Event) {
    event.preventDefault(); // Prevent form submission
    this.router.navigate(['/register']);
  }
}