import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { RegisterRoutingModule } from './register-routing.module';
import { Step1Component } from './step1/step1.component';
import { RegisterComponent } from './register/register.component';
// ... other imports as needed

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    RegisterRoutingModule,
    Step1Component,
    Step2Component,
    Step3Component,
    RegisterComponent,
    // etc...
  ],
})
export class RegisterModule {}
