import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { HttpClientModule } from '@angular/common/http';
import { Step1Component } from './components/register/step1/step1.component';
import { Step2Component } from './components/register/step2/step2.component';
import { Step3Component } from './components/register/step3/step3.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RegisterComponent } from './components/register/register/register.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayer } from '@angular/youtube-player';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { AuthService } from './core/services/auth.service';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './core/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    MainpageComponent,
    // MovieItemComponent,
    // MovieListComponent,
    // MovieDetailsComponent,
    // NavBarComponent,
  ],
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

    // MainpageComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [provideAnimationsAsync(), AuthService, AuthGuard],
    bootstrap: [AppComponent],
  })
  
export class AppModule {}