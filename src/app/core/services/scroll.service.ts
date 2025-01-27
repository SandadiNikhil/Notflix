import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private savedPosition = 0;

  savePosition(position: number) {
    this.savedPosition = position;
  }

  getPosition(): number {
    return this.savedPosition;
  }
}