import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { Observable } from 'rxjs';
import { Movie } from '../../core/interfaces/movies.interface';
import { CommonModule } from '@angular/common';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { Router } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieItemComponent, InfiniteScrollModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies$: Observable<Movie[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  currentPage = 1;

  constructor(
    private movieService: MovieService, 
    private router: Router
  ) {
    this.movies$ = this.movieService.movies$;
    this.loading$ = this.movieService.loading$;
    this.error$ = this.movieService.error$;
    
  }

  ngOnInit(): void {
    this.getMovies(this.currentPage);
  }

  getMovies(page: number) {
    this.movieService.getMovies(page);
  }

  onScrollDown(): void {
    this.currentPage++;
    this.getMovies(this.currentPage);
  }

  trackByMovieId(index: number, movie: Movie): number {
    return movie.id;
  }
}