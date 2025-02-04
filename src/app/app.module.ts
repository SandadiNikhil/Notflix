import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayer } from '@angular/youtube-player';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { AuthService } from './core/services/authentication/auth.service';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './core/guards/auth.guard';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component';

@NgModule({

  declarations: [ AppComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    YouTubePlayer,
    CommonModule,
    LoginComponent,
    MovieItemComponent,
    MovieListComponent,
    MovieDetailsComponent,
    NavBarComponent,
    CoreModule,
    RouterModule,
    ],
    
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [provideAnimationsAsync(), AuthService, AuthGuard],
    bootstrap: [AppComponent],
  })
  
export class AppModule {}