import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div [formGroup]="formGroup">
      <p>Review your registration details and submit.</p>
    </div>
  `,
})
export class Step3Component {
  @Input() formGroup!: FormGroup;
}