import { Component, OnInit, Input, inject } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { movieDetails } from '../../core/interfaces/movies.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})

export class MovieDetailsComponent implements OnInit {

  sanitizer: DomSanitizer = inject(DomSanitizer);
  @Input() movieDetails: movieDetails = {} as movieDetails;

  isPlayerVisible = false;
  videoKey: string | null = null;

  videoDetails: any[] = [];          
  selectedVideo: any = null;         
  isVideosModalOpen = false; 

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.movieDetails = this.route.snapshot.data['movie'];

    this.route.queryParamMap.subscribe((params) => {
      console.log('Params', params);
      const idString = params.get('id');
      const id = idString ? +idString : null;
      if (id) {
        // this.getMovieDetails(id);
        // this.getAllVideos(id);
        this.loadMovieData(id);
      }    
    });
  }

  loadMovieData(id: number) {
    this.movieService.getMovieDetails(id).subscribe((res) => {
      if (res) {
        this.movieDetails = res;
        this.movieService.getCastDetails(id).subscribe((castRes) => {
          if (castRes?.cast) {
            this.movieDetails.actors = castRes.cast.slice(0, 10).map((actor: any) => ({
              name: actor.name,
              character: actor.character,
              profile_path: actor.profile_path,
            }));
          }
        });
      }
    });
  }

  getVideo(id: number, type: 'play' | 'trailer') {
    this.movieService.getVideo(id).subscribe((res: any) => {
      if (res?.results?.length) {
        const trailer = res.results.find(
          (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
        );
        if (trailer) {
          this.videoKey = trailer.key;
          this.isPlayerVisible = true;
        } else {
          console.warn('No YouTube trailer found');
        }
      } else {
        console.warn('No videos found for this movie');
      }
    });
  }

  getMovieDetails(id: number) {
    this.movieService.getMovieDetails(id).subscribe((res) => {
      if (res) {
        this.movieDetails = res;
        this.movieService.getCastDetails(id).subscribe((castResponse) => {
          if (castResponse?.cast) {
            this.movieDetails.actors = castResponse.cast.slice(0, 10).map((actor: any) => ({
              name: actor.name,
              character: actor.character,
              profile_path: actor.profile_path,
            }));
          }
        });
      }
    });
  }

  getAllVideos(id: number) {
    this.movieService.getVideo(id).subscribe((res: any) => {
      console.log('TMDB videos:', res);
      this.videoDetails = res.results || [];
    });
  }

  openVideosModal() {
    this.isVideosModalOpen = true;
    this.selectedVideo = null; 
  }

  closePlayer() {
    this.isPlayerVisible = false;
    this.videoKey = null; 
  }

  selectVideo(video: any) {
    this.selectedVideo = video;
  }

  getVideoUrl(): SafeResourceUrl {
    if (this.videoKey) {
      const url = `https://www.youtube.com/embed/${this.videoKey}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return '';
  }
}