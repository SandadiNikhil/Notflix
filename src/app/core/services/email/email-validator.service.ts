import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';

export function emailValidator(http: HttpClient): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value;
    if (!email) {
      return of(null);
    }

    return of(email).pipe(
      debounceTime(500),
      switchMap(() =>
        http.post<boolean>('/api/v1/auth/check-email', { email }).pipe(
          map(response => response ? { emailExists: true } : null),
          catchError(() => of(null))
        )
      )
    );
  };
}