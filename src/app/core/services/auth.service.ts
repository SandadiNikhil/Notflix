import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from '../interfaces/movie';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private signupData: any = {};
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private authServerPath = 'http://localhost:5566/api/v1/auth';

  constructor(private http: HttpClient, private router: Router) {}

    private currentUser: string | null = null;

  addSignupData(key: string, value: any): void {
    this.signupData[key] = value;
    sessionStorage.setItem(key, value); // Use sessionStorage for temporary storage
  }

  getSignupData(key: string): any {
    return this.signupData[key] || sessionStorage.getItem(key);
  }

    getCurrentUser(): string | null {
    return this.currentUser;
  }
  
  // signup(): Observable<AuthResponse> {
  //       return this.http.post<AuthResponse>(`${this.authServerPath}/signup`, this.signupData).pipe(
  //         tap((response) => {
  //           this.storeToken(response.accessToken); 
  //           const decodedToken: any = jwtDecode(response.accessToken);
  //           this.currentUser = decodedToken.username;
  //           this.storeUsername(this.currentUser);
  //           console.log('Signup successful');
  //           this.router.navigate(['/home']); 
  //         }),
  //         catchError((error) => {
  //           console.error('Error in signup:', error);
  //           return throwError(() => new Error('Signup failed! Please try again.'));
  //         })
  //       );
  //     }


  signup(): Observable<any> {
    const body = {
      email: this.getSignupData('email'),
      password: this.getSignupData('password'),
      username: this.getSignupData('username'),
      tmdbKey: this.getSignupData('tmdb'),
      plan: this.getSignupData('plan'),
    };
    console.log('Signup body:', body);
    return this.http.post('http://localhost:5566/api/auth/signup', body).pipe(
      tap((response) => {
        console.log('Signup response:', response);
        console.log('Signup successful');
        this.router.navigate(['/login']);
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

  // login(email: string, password: string): Observable<any> {
  //   const body = { email, password };
  //   return this.http.post('http://localhost:5566/api/auth/login', body).pipe(
  //     tap((response: any) => {
      
  //       this.setAuthenticated(true);

  //       // Redirect to the movie list page
  //       this.router.navigate(['/movieList']);
  //     })
  //   );
  // }
  login(email: string, password: string): Observable<AuthResponse> {
        const loginData = { email, password };
        
        return this.http.post<AuthResponse>(`${this.authServerPath}/signin`, loginData).pipe(
          tap((response) => {
            this.storeToken(response.accessToken);
            const decodedToken: any = jwtDecode(response.accessToken);
            this.currentUser = decodedToken.username;
            this.storeUsername(this.currentUser);
            console.log('Login successful');
            this.router.navigate(['/movies']);
          }),
          catchError((error) => {
            console.error('Error in login:', error);
            return throwError(() => new Error('Login failed! Please try again.'));
          })
        );
      }

  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  logout(): void {
    localStorage.clear();
    this.isAuthenticatedSubject.next(false);

    sessionStorage.clear();

    this.router.navigate(['/login']);
  }
}






// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
// import { jwtDecode } from 'jwt-decode';
// import { AuthResponse, SignupData } from '../interfaces/movie';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private authServerPath = 'http://localhost:5566/api/v1/auth';
//   private signupData: SignupData = {};
//   private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

//   private currentUser: string | null = null;
  
//   constructor(private http: HttpClient, private router: Router) {
//     this.loadCurrentUser();
//   }
  
//   login(email: string, password: string): Observable<AuthResponse> {
//     const loginData = { email, password };
    
//     return this.http.post<AuthResponse>(`${this.authServerPath}/signin`, loginData).pipe(
//       tap((response) => {
//         this.storeToken(response.accessToken);
//         const decodedToken: any = jwtDecode(response.accessToken);
//         this.currentUser = decodedToken.username;
//         this.storeUsername(this.currentUser);
//         console.log('Login successful');
//         this.router.navigate(['/movies']);
//       }),
//       catchError((error) => {
//         console.error('Error in login:', error);
//         return throwError(() => new Error('Login failed! Please try again.'));
//       })
//     );
//   }

//   setAuthenticated(isAuthenticated: boolean): void {
//     this.isAuthenticatedSubject.next(isAuthenticated);
//   }

//   getCurrentUser(): string | null {
//     return this.currentUser;
//   }

//   logout() {
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('current_user');
//     console.log('Logged out successfully');
//     this.currentUser = null; 
//     this.router.navigate(['/login']);
//   }
  
//   private storeToken(token: string) {
//     localStorage.setItem('access_token', token);
//   }

//   private storeUsername(username: string | null) {
//     if (username) {
//       localStorage.setItem('current_user', username);
//     } else {
//       localStorage.removeItem('current_user');
//     }
//   }

//   private loadCurrentUser() {
//     const storedUsername = localStorage.getItem('current_user');
//     if (storedUsername) {
//       this.currentUser = storedUsername;
//     }
//   }
  
//   addSignupData(key: keyof SignupData, value: any) {
//     this.signupData[key] = value;
//   }
  
//   signup(): Observable<AuthResponse> {
//     return this.http.post<AuthResponse>(`${this.authServerPath}/signup`, this.signupData).pipe(
//       tap((response) => {
//         this.storeToken(response.accessToken); 
//         const decodedToken: any = jwtDecode(response.accessToken);
//         this.currentUser = decodedToken.username;
//         this.storeUsername(this.currentUser);
//         console.log('Signup successful');
//         this.router.navigate(['/home']); 
//       }),
//       catchError((error) => {
//         console.error('Error in signup:', error);
//         return throwError(() => new Error('Signup failed! Please try again.'));
//       })
//     );
//   }
  
// }
  