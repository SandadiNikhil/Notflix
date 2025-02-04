import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../../../core/services/register/register.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { emailValidator } from '../../../core/services/email/email-validator.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    MatFormFieldModule, MatInputModule, MatButtonModule,
  ],
})
export class Step1Component {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      email: ['',  
        { 
          validators: [Validators.required, Validators.email], 
          asyncValidators: [emailValidator(this.http)], 
          updateOn: 'blur' 
        }
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.route.queryParamMap.subscribe((params) => {
      const qEmail = params.get('email');
      if (qEmail) {
        this.form.patchValue({ email: qEmail });
      }
    });
  }

  next() {
    if (this.form.valid) {
      this.registerService.updateFormData(this.form.value);
      this.router.navigate(['/register/step2']);
    }
  }
}
