import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Step1Component } from '../step1/step1.component';
import { Step2Component } from '../step2/step2.component';
import { Step3Component } from '../step3/step3.component';
import { PlanComponent } from '../plan/plan.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    Step1Component,
    Step2Component,
    Step3Component,
    PlanComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;

  @ViewChild('stepper') private stepper!: MatStepper;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('RegisterComponent initialized');
    this.registrationForm = this.fb.group({
      step1: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      }),
      plan: this.fb.group({
        planType: ['', Validators.required],
      }),
      step2: this.fb.group({
        username: ['', [Validators.required]],
        tmdb: ['', [Validators.required]],
      }),
      step3: this.fb.group({
      }),
    });
  }

  // get step1FormGroup(): FormGroup {
  //   return this.registrationForm.get('step1') as FormGroup;
  // }

  // get planFormGroup(): FormGroup {
  //   return this.registrationForm.get('plan') as FormGroup;
  // }

  // get step2FormGroup(): FormGroup {
  //   return this.registrationForm.get('step2') as FormGroup;
  // }

  // get step3FormGroup(): FormGroup {
  //   return this.registrationForm.get('step3') as FormGroup;
  // }

  getFormGroup(formGroupName: string): FormGroup {
    const formGroup = this.registrationForm.get(formGroupName);
    if (formGroup instanceof FormGroup) {
      return formGroup;
    } else {
      // Handle the error or throw an exception
      throw new Error(`FormGroup with name ${formGroupName} not found.`);
    }
  }

  onSubmit(): void {
    console.log('onSubmit() called');
    console.log('Form Value:', this.registrationForm.value);

    if (this.registrationForm.valid) {
      console.log('Registration data:', this.registrationForm.value);

      const email = this.registrationForm.get('step1.email')?.value;
      const password = this.registrationForm.get('step1.password')?.value;
      const username = this.registrationForm.get('step2.username')?.value;
      const tmdb = this.registrationForm.get('step2.tmdb')?.value;
      const plan = this.registrationForm.get('plan.planType')?.value;

      this.authService.addSignupData('email', email);
      this.authService.addSignupData('password', password);
      this.authService.addSignupData('username', username);
      this.authService.addSignupData('tmdb', tmdb);
      this.authService.addSignupData('plan', plan);

      this.authService.signup().subscribe({
        next: () => {
          console.log('Signup completed');
          this.router.navigate(['/login']);
        },
        error: (err: any) => alert(err.message),
      });
    } else {
      console.error('Form is not valid');
    }
  }
  
  goToNextStep() {
    if (this.stepper) {
      this.stepper.next();
    } else {
      console.error('MatStepper instance is not available.');
    }
  }
}