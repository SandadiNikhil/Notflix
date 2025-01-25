// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
// import { MatStepperModule } from '@angular/material/stepper';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';

// import { RegisterRoutingModule } from './register-routing.module';
// import { MatSelectModule } from '@angular/material/select';
// import { RegisterComponent } from './register/register.component';

// @NgModule({
//   declarations: [
//     // RegisterComponent,
//     // PlanComponent,
//     // Step1Component,
//     // Step2Component,
//     // Step3Component
//   ],
//   imports: [
//     CommonModule,
//     RegisterRoutingModule,
//     ReactiveFormsModule,
//     MatStepperModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatSelectModule,
//   ],
// })
// export class RegisterModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { Step3Component } from './step3/step3.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { PlanComponent } from './plan/plan.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    Step1Component,
    Step2Component,
    Step3Component,
    PlanComponent,
    RegisterComponent,
  ],

})
export class RegisterModule {}
