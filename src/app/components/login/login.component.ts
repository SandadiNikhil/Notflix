import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/authentication/auth.service';
import { loginValidator } from '../../core/services/email/login-validator.service';
import { FooterComponent } from '../../core/components/footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
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
    private authService: AuthService,
    private http: HttpClient
    ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(8)]],
    }
    // , {
    //   asyncValidators: [loginValidator(this.http)],
    //   updateOn: 'blur'
    // });
    );
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, pwd } = this.loginForm.value;

      this.authService.login(email, pwd).subscribe({
        next: (response) => {
          this.authService.setUserRole(response.role); 
          console.log('Login successful', response);         
          this.router.navigate(['/movieList']);
        },
        error: (err) => {
          console.error('Login failed', err);
        },
      });
    }
    console.log(this.loginForm.value);
   }

}