import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './mainpage.component';

const routes: Routes = [
  {
    path: '',
    component: MainpageComponent,
  },
];

@NgModule({
  
  imports: [
    RouterModule.forChild(routes), 
    MainpageComponent 
  ],
  
  declarations: [],
})
export class MainpageModule {}
