// import { CommonModule } from '@angular/common';
// import { Component, Input, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-step3',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   template: `
//     <div [formGroup]="formGroup">
//       <p>Review your registration details and submit.</p>
//     </div>
//   `,
// })
// export class Step3Component {
//   @Input() formGroup!: FormGroup;
// }


import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component {
  @Input() formGroup!: FormGroup;

  get reviewData() {
    return {
      username: this.formGroup.get('step2.username')?.value || 'N/A',
      email: this.formGroup.get('step1.email')?.value || 'N/A',
      password: this.formGroup.get('step1.password')?.value || 'N/A',
      plan: this.formGroup.get('plan.planType')?.value || 'N/A',
      tmdbApiKey: this.formGroup.get('step2.tmdb')?.value || 'N/A'
    };
  }

  onSubmit() {
    console.log('Form Submitted:', this.formGroup.value);
  }
}
