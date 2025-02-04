import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { MovieService } from '../../../core/services/movie.service';
import { FooterComponent } from "../../../core/components/footer/footer.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FooterComponent
],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService, 
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      step1: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      }),
      plan: this.fb.group({
        planType: ['', Validators.required],
      }),
      step2: this.fb.group({
        username: ['', Validators.required],
        tmdb: ['', Validators.required],
      }),
      step3: this.fb.group({}),
    });
  }

  ngOnInit(): void {
    console.log('RegisterComponent initialized');
  }

  getFormGroup(formGroupName: string): FormGroup {
    const formGroup = this.registrationForm.get(formGroupName);
    if (formGroup instanceof FormGroup) {
      return formGroup;
    } else {
      throw new Error(`FormGroup with name ${formGroupName} not found.`);
    }
  }

  goToNextStep() {
    console.log('Going to the next step...');
  }

  onSubmit(): void {
    console.log('Form submitted', this.registrationForm.value);
    if (this.registrationForm.valid) {
      const email = this.registrationForm.get('step1.email')?.value;
      const password = this.registrationForm.get('step1.password')?.value;
      const username = this.registrationForm.get('step2.username')?.value;
      // const tmdb = this.registrationForm.get('step2.tmdb')?.value;
      const plan = this.registrationForm.get('plan.planType')?.value;
      //console.log('Payload:', { email, password, username, tmdb, plan });
      console.log('Payload:', { email, password, username, plan });

      this.movieService.signupData = {
        email,
        password,
        username,
        // tmdb,
        plan,
      };
      this.movieService.signup().subscribe({
        next: (res) => {
          console.log('Signup success', res); 
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Signup error', err);
          alert('Signup failed: ' + err.message);
        }
      });
    } else {  console.warn('Form is invalid, not sending request'); }
    console.log('Current Registration Form Values:', this.registrationForm.value);
  }

}