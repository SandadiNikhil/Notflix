import { Component, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input() buttonName: string = 'Sign In';
  userName: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.updateUserName();
  }
  updateUserName() {
    this.userName = this.authService.getCurrentUser();
  }

  navigateToLogin() {
    this.authService.logout();
    this.updateUserName();
    this.router.navigate(['/login']);
  }

  navigateToHome(){
    this.router.navigate(['']);
  }

}

// ngOnInit() {
  //   this.updateButton();
  // }
  
  // updateButton(){
    //   if(this.authService.fetchLoginStatus()) {
      //     this.buttonName = 'Sign Out';
    //     this.userName = this.authService.fetchUserName();
    //   } else {
      //     this.buttonName = 'Sign In';
      //     this.userName = null;
      //   }
      // }
      
      
      
      // if(this.authService.fetchLoginStatus()) {
        //   this.authService.onLogout();
        //   // this.updateButton();
        // } 
        // if(){
          
      // }
      // else {
        //}
        // this.updateButton();