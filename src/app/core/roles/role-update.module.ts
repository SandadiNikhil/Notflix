import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleUpdateComponent } from './role-update.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: RoleUpdateComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,  
    FormsModule,   
    RouterModule.forChild(routes)
  ]
})
export class RoleUpdateModule {}
