import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../../core/services/register.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, MatInputModule, MatButtonModule,
  ],
})

export class Step2Component {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      tmdbKey: ['', Validators.required],
    });
  }

  next() {
    if (this.form.valid) {
      this.registerService.updateFormData(this.form.value);
      this.router.navigate(['/register/step3']);
    }
  }

  back() {
    this.router.navigate(['/register/step1']);
  }
}
