import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  // The multi-step form data across all pages
  private formData = new BehaviorSubject<any>({
    email: '',
    password: '',
    username: '',
    tmdbKey: '',
    plan: '',
  });

  formData$ = this.formData.asObservable();

  updateFormData(data: any) {
    this.formData.next({ ...this.formData.value, ...data });
  }

  getFormData() {
    return this.formData.value;
  }
}
