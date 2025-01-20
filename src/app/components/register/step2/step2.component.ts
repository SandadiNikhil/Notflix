import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <div [formGroup]="formGroup">
      <mat-form-field>
        <mat-label>Username</mat-label>
        <input matInput formControlName="username" required />
        <mat-error *ngIf="formGroup.get('username')?.hasError('required')">
          Username is required
        </mat-error>
      </mat-form-field>
      <mat-form-field>
        <mat-label>TMDB API Key</mat-label>
        <input matInput formControlName="tmdb" required />
        <mat-error *ngIf="formGroup.get('tmdb')?.hasError('required')">
          TMDB API Key is required
        </mat-error>
      </mat-form-field>
    </div>
  `,
})
export class Step2Component {
  @Input() formGroup!: FormGroup;
}