import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div [formGroup]="formGroup">
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" required />
        <mat-error *ngIf="formGroup.get('email')?.hasError('required')">
          Email is required
        </mat-error>
        <mat-error *ngIf="formGroup.get('email')?.hasError('email')">
          Please enter a valid email address
        </mat-error>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Password</mat-label>
        <input matInput formControlName="password" type="password" required />
        <mat-error *ngIf="formGroup.get('password')?.hasError('required')">
          Password is required
        </mat-error>
        <mat-error *ngIf="formGroup.get('password')?.hasError('minlength')">
          Password must be at least 8 characters long
        </mat-error>
      </mat-form-field>
    </div>
  `,
})
export class Step1Component {
  @Input() formGroup!: FormGroup;
}