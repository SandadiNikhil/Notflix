import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Movie, Result } from '../../core/interfaces/movies.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieItemComponent {
  @Input() movie: Result | Movie = {} as Result | Movie;
  @Input() loading: boolean = false;
  constructor(private router: Router) {}

  // movieDetails(movie: Result | Movie) {
  //   // this.router.navigate(['/movieDetails'], { queryParams: { id: movie.id } });
  //   this.loading = true;
  //   this.router.navigate(['/movieDetails', movie.id]); 
  // }

  movieDetails(movie: Result | Movie) {
    this.loading = true; 
    setTimeout(() => {
      this.router.navigate(['/movieDetails', movie.id]).then(() => {
        this.loading = false; 
      });
    }, 100);
  }
}