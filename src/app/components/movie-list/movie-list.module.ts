import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';


const routes: Routes = [
  {
    path: '',
    component: MovieListComponent,
  },
];

@NgModule({
  imports: 
  [
    RouterModule.forChild(routes),
    MovieListComponent, 
    InfiniteScrollModule,
  ],
})
export class MovieListModule {}
