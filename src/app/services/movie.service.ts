import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AuthResponse,
  Movie,
  MovieResponse,
  SignupData,
  movieDetails,
} from './interfaces/movies.interface';

import { BehaviorSubject, Observable, throwError, of, Subject } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class MovieService {
  private baseUrl = 'https://api.themoviedb.org/3/';
  private apiKey = '09ede2b2422b2a4d970701cac92ebd60'; // Replace with your actual API key
  private authServerPath = 'http://localhost:5566/api/v1/auth';

  private signupData: SignupData = {};

  private currentUser: string | null = null;

  private moviesSubject$ = new BehaviorSubject<Movie[]>([]);
  movies$ = this.moviesSubject$.asObservable();

  private movieDetailsSubject$ = new BehaviorSubject<movieDetails | null>(null);
  movieDetails$ = this.movieDetailsSubject$.asObservable();

  private loadingSubject$ = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject$.asObservable();

  private errorSubject$ = new BehaviorSubject<string | null>(null);
  error$ = this.errorSubject$.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadCurrentUser();
  }
  // Example of adding JWT token to headers (will be used after login)
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token'); // Or get it from your auth service
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  private loadCurrentUser() {
    const storedUsername = localStorage.getItem('current_user');
    if (storedUsername) {
      this.currentUser = storedUsername;
    }
  }
  private storeUsername(username: string | null) {
    if (username) {
      localStorage.setItem('current_user', username);
    } else {
      localStorage.removeItem('current_user');
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
    console.log('Logged out successfully');
    this.currentUser = null; 
    this.router.navigate(['/login']);
  }
  
  private storeToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getMovies(page: number): void {
    this.loadingSubject$.next(true);
    this.errorSubject$.next(null);

    const url = `${this.baseUrl}discover/movie?api_key=${this.apiKey}&page=${page}`;

    this.http
      .get<MovieResponse>(url)
      .pipe(
        tap((res) => this.moviesSubject$.next(res.results)),
        catchError((error) => this.handleError(error))
      )
      .subscribe(() => this.loadingSubject$.next(false));
  }

  getMovieDetails(id: number): void {
    this.loadingSubject$.next(true);
    this.errorSubject$.next(null);
    this.movieDetailsSubject$.next(null);

    const url = `${this.baseUrl}movie/${id}?api_key=${this.apiKey}`;

    this.http
      .get<movieDetails>(url)
      .pipe(
        tap((res) => this.movieDetailsSubject$.next(res)),
        catchError((error) => this.handleError(error))
      )
      .subscribe(() => this.loadingSubject$.next(false));
  }

  getVideo(id: number): Observable<any> {
    this.loadingSubject$.next(true);
    this.errorSubject$.next(null);

    const url = `${this.baseUrl}movie/${id}/videos?api_key=${this.apiKey}`;

    return this.http.get(url).pipe(
      catchError((error) => this.handleError(error)),
      finalize(() => this.loadingSubject$.next(false))
    );
  }

  // Centralized error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    this.errorSubject$.next(errorMessage);
    this.loadingSubject$.next(false);
    return throwError(() => new Error(errorMessage));
  }

  // Example of caching (can be expanded)
  private movieCache: { [page: number]: MovieResponse } = {};

  getCachedMovies(page: number): Observable<MovieResponse> {
    if (this.movieCache[page]) {
      return of(this.movieCache[page]);
    }

    const url = `${this.baseUrl}popular?api_key=${this.apiKey}&page=${page}`;
    return this.http.get<MovieResponse>(url).pipe(
      tap((res) => (this.movieCache[page] = res))
    );
  }

  // Search functionality with debouncing
  searchMovies(query: string, page: number = 1): Observable<MovieResponse> {
    if (!query.trim()) {
      // Return empty results if the query is empty
      return of({ page: 1, results: [], total_pages: 0, total_results: 0 });
    }

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(
      query
    )}&page=${page}`;
    return this.http.get<MovieResponse>(url);
  }

  signup(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authServerPath}/signup`, this.signupData).pipe(
      tap((response) => {
        this.storeToken(response.accessToken); 
        const decodedToken: any = jwtDecode(response.accessToken);
        this.currentUser = decodedToken.username;
        this.storeUsername(this.currentUser);
        console.log('Signup successful');
        this.router.navigate(['/home']); 
      }),
      catchError((error) => {
        console.error('Error in signup:', error);
        return throwError(() => new Error('Signup failed! Please try again.'));
      })
    );
  }
}