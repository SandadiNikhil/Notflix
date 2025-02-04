import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, catchError, throwError, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from '../../interfaces/movie';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private signupData: { [key: string]: string } = {};
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private authServerPath = 'http://localhost:5566/api/v1/auth';

  private currentUser: string | null = null;
  private currentUserRole: string = localStorage.getItem('user_role') || 'User';

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.isAuthenticatedSubject.next(true);
      const storedUser = localStorage.getItem('current_user');
      this.currentUser = storedUser || null;
      this.currentUserRole = localStorage.getItem('user_role') || 'User';
    }
  }
  
  addSignupData(key: string, value: any): void {
    this.signupData[key] = value;
    sessionStorage.setItem(key, value); 
  }

  getSignupData(key: string): any {
    return this.signupData[key] || sessionStorage.getItem(key);
  }

  getCurrentUser(): string | null {
    if (!this.isAuthenticatedSubject.getValue()) {
      return null;
    }
    return localStorage.getItem('current_user');
  }

  getUserRole(): string {
    if (!this.isAuthenticatedSubject.getValue()) {
        return 'User';
    }
    return localStorage.getItem('user_role') || 'User';
}

  signup(): Observable<any> {
    const body = {
      email: this.getSignupData('email'),
      password: this.getSignupData('password'),
      username: this.getSignupData('username'),
      tmdbKey: this.getSignupData('tmdb'),
      plan: this.getSignupData('plan'),
    };

    console.log('Signup body:', body);
    return this.http.post(`${this.authServerPath}/signup`, body).pipe(
      tap((response: any) => {
        console.log('Signup response:', response);
        console.log('Signup successful');
        
        this.currentUser = body.username;
        this.storeUsername(this.currentUser);
        this.setUserRole(response.role);
        this.router.navigate(['/login']);
      }),

      catchError((error: HttpErrorResponse) => {
        console.error('Error during signup:', error);
        return throwError(() => new Error('Signup failed! Please try again.'));
      })
    );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const loginData = { email, password };
    return this.http.post<AuthResponse>(`${this.authServerPath}/signin`, loginData).pipe(
      tap((response: any) => {
        this.storeToken(response.accessToken);
        const decodedToken: any = jwtDecode(response.accessToken);
        this.setUserRole(response.role); 

        this.currentUser = decodedToken.username;
        this.storeUsername(this.currentUser);
        this.setAuthenticated(true);
        this.isAuthenticatedSubject.next(true);

        this.router.navigate(['/movieList']); 
      }),
      catchError((error) => {
        console.error('Error in login:', error);
        return throwError(() => new Error('Login failed! Please try again.'));
      })
    );
  }  

  private storeToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  private storeUsername(username: string | null) {
    if (username) {
      localStorage.setItem('current_user', username);
    } else {
      localStorage.removeItem('current_user');
    }
  }

  public setUserRole(role: string | null | undefined): void {
    this.currentUserRole = role || 'User';
    if (role) {
      localStorage.setItem('user_role', role);
    } else {
      localStorage.removeItem('user_role');
    }
  }

  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('current_user');
    sessionStorage.clear();

    localStorage.clear();
    this.isAuthenticatedSubject.next(false);

    this.currentUser = null;
    this.currentUserRole = 'User';

    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  public updateUserCredentials(newCredentials: Partial<{ email: string; password: string; username: string; role: string }>): Observable<any>
  {
    const token = localStorage.getItem('access_token');
    const headers = token ? new HttpHeaders({ 'Authorization': token }) : undefined;

    return this.http.patch(`${this.authServerPath}/userupdate`, newCredentials, { headers }).pipe(
      tap((response: any) => {
        console.log('User credentials updated successfully', response);
        if (response.role) { this.setUserRole(response.role); }
        if (response.accessToken) { this.storeToken(response.accessToken); }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Failed to update user credentials', error);
        return throwError(() => new Error('Update failed! Please try again.'));
      })
    );
  }

}