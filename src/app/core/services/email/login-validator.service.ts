import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, debounceTime, map, Observable, of, switchMap } from 'rxjs';

export function loginValidator(http: HttpClient): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value;
    if (!email) {
      return of(null);
    }

    // return http.get<{ exists: boolean }>(`/api/v1/auth/check-email?email=${email}`).pipe(
    //   map(response => {
    //     return response.exists ? { emailExists: true } : null;
    //   }),
    //   catchError(() => of(null))
    // );


    return of(email).pipe(
      debounceTime(100),
      switchMap(() =>
        http.post<boolean>('/api/v1/auth/check-email', { email }).pipe(
          map((response) => (response === true ? { emailExists: true } : null)),
          catchError(() => of(null))
        )
      )
    );
    
  };
}