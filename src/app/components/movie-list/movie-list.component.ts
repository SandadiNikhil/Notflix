import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Observable } from 'rxjs';
import { Movie } from '../../services/interfaces/movies.interface';
import { CommonModule } from '@angular/common';
import { MovieItemComponent } from '../movie-item/movie-item.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieItemComponent],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies$: Observable<Movie[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private movieService: MovieService) {
    this.movies$ = this.movieService.movies$;
    this.loading$ = this.movieService.loading$;
    this.error$ = this.movieService.error$;
  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getMovies(1);
  }

  trackByMovieId(index: number, movie: Movie): number {
    return movie.id;
  }
}