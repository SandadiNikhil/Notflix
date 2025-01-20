import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {

  // loginForm: FormGroup = this.fb.group({
  //   email: new FormControl('', [Validators.required, Validators.minLength(6)]),
  //   pwd: new FormControl('', [Validators.required, Validators.minLength(8)]),
  // }); 

  loginForm: FormGroup;


  get email() {
    return this.loginForm.get('email');
  }
  get pwd() {
    return this.loginForm.get('pwd');
  }

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private authService: AuthService
    ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(6)]],
      pwd: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // ngOnInit() {
  //   this.loginForm = new FormGroup({
  //     email: new FormControl('', [
  //       Validators.required,
  //       Validators.minLength(6),
  //     ]),
  //     pwd: new FormControl('', [Validators.required, Validators.minLength(6)]),
  //   });
  // }

  Notflix() {
    this.router.navigate(['movieList'])
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, pwd } = this.loginForm.value;

      this.authService.login(email, pwd).subscribe({
        next: (response) => {
         
          this.authService.setAuthenticated(true);

          this.router.navigate(['/movieList']);
        },
        error: (err) => {
          // Handle login error, display a message, etc.
          console.error('Login failed', err);
        },
      });
    }
    console.log(this.loginForm.value);
  }
}
