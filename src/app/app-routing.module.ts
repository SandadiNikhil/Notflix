import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MovieDetailResolver } from './core/resolvers/movie-detail.resolver';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./components/mainpage/mainpage.module').then((m) => m.MainpageModule),
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then((m) => m.LoginModule),
  }, 

  {
    path: 'register',
    loadChildren: () =>
      import('./components/register/register.module').then((m) => m.RegisterModule),
  },

  {
    path: 'movieList',
    loadChildren: () =>
      import('./components/movie-list/movie-list.module').then((m) => m.MovieListModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'movieDetails/:id',
    loadChildren: () =>
      import('./components/movie-details/movie-details.module').then((m) => m.MovieDetailsModule),
    canActivate: [AuthGuard],
    resolve: { movie: MovieDetailResolver },
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
