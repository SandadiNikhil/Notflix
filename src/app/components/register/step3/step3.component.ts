import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../../core/services/register/register.service';
import { MovieService } from '../../../core/services/movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatRadioModule, 
    MatButtonModule,
    MatFormFieldModule,
  ],
})
export class Step3Component {
  plans = [
    { name: 'Basic', price: '$9.99', quality: 'Good', resolution: '480p' },
    { name: 'Standard', price: '$15.49', quality: 'Better', resolution: '1080p' },
    { name: 'Premium', price: '$19.99', quality: 'Best', resolution: '4K + HDR' },
  ];  selectedPlan = '';

  constructor(
    private registerService: RegisterService,
    private movieService: MovieService, // If using your old code from MovieService
    private router: Router
  ) {}

  selectPlan(planName: string) {
  this.selectedPlan = planName;
}
  submit() {
    if (!this.selectedPlan) {
      // maybe show an error or block submission
      return;
    }

    // 1) Merge plan selection into the form data
    this.registerService.updateFormData({ plan: this.selectedPlan });

    // 2) Retrieve all form data from Steps 1 + 2 + 3
    const finalData = this.registerService.getFormData();

    // 3) Integrate old signup logic from your "old code"
    // e.g., if your old approach was:
    // this.movieService.signupData = finalData; 
    // this.movieService.signup().subscribe(...);

    this.movieService.signupData = {
      email: finalData.email,
      password: finalData.password,
      username: finalData.username,
      tmdb: finalData.tmdbKey,
      plan: finalData.plan
    };

    // 4) Actually call signup to the backend
    this.movieService.signup().subscribe({
      next: (res) => {
        console.log('Signu completed:', res);
        // Possibly route to success page
        this.router.navigate(['/success']);
      },
      error: (err) => {
        console.error('Signup failed', err);
        // Show an error message or handle as needed
      },
    });
  }

  back() {
    this.router.navigate(['/register/step2']);
  }
}
