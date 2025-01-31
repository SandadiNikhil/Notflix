import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { RegisterComponent } from './register/register.component';
import { StepGuard } from '../../core/guards/step.guard';

const routes: Routes = [
  { 
    path: '', component: RegisterComponent, 
    children: [
      { path: 'step1', component: Step1Component },
      { path: 'step2', component: Step2Component, canActivate: [StepGuard] },
      { path: 'step3', component: Step3Component, canActivate: [StepGuard] },
      { path: '', redirectTo: 'step1', pathMatch: 'full' },
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
