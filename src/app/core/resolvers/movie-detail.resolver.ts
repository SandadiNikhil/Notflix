import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { forkJoin, Observable, of } from "rxjs";
import { catchError, delay, map } from 'rxjs/operators';
import { MovieService } from "../services/movie.service";

@Injectable({
    providedIn: 'root',
  })

export class MovieDetailResolver implements Resolve<any> {
  constructor(private movieService: MovieService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const movieId = route.paramMap.get('id');
    if (!movieId) return of(null);

    return forkJoin({
      movie: this.movieService.getMovieDetails(+movieId),
      cast: this.movieService.getCastDetails(+movieId)
    }).pipe(
      // delay(100),
      map(({movie, cast}) => ({
        ...movie,
        actors: cast.cast.slice(0, 10).map((actor: any) => ({
          name: actor.name,
          character: actor.character || 'N/A',
          profile_path: actor.profile_path
        }))
      })),
      catchError((error) => {
        console.error('Error fetching movie details:', error);
        return of(null);
      })
    );
  }
}