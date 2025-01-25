import { Component, OnInit, Input, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { movieDetails } from '../../services/interfaces/movies.interface';
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
  bgImageVariable = '';
  sanitizer: DomSanitizer = inject(DomSanitizer);
  @Input() movieDetails: movieDetails | null = null;
  videoDetails: [] | null = null;
  videoInfo: any;
  isPlayerVisible = false;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      console.log('Params', params);
      const idString = params.get('id');
      const id = idString ? +idString : null;
      this.getMovieDetails(id);
      // this.getVideo(id);
    });
  }

  getMovieDetails(id: number | null) {
    if (id) {
      this.movieService.getMovieDetails(id).subscribe((res: any) => {
        if (res) {
          this.movieDetails = res;
          this.movieService.getCastDetails(id).subscribe((castResponse: any) => {
            if (castResponse && castResponse.cast) {
              this.movieDetails = {
                ...(this.movieDetails as movieDetails), 
                actors: castResponse.cast.slice(0, 10),
              };
              
            }
          });
        }
      });
    }
  }

  getVideo(id: number | null, type: 'play' | 'trailer') {
    if (id !== null) {
      this.movieService.getVideo(id).subscribe((res: any) => {
        console.log('Get Video Info:', res);
  
        this.videoDetails = res.results;
  
        if (this.videoDetails && this.videoDetails.length > 0) {
          this.videoInfo = this.videoDetails.find(
            (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
          );
  
          if (this.videoInfo) {
            console.log('Found Video Key:', this.videoInfo.key);
  
            if (type === 'play' || type === 'trailer') {
              this.isPlayerVisible = true;
            }
          } else {
            console.warn('No trailer found for this movie.');
          }
        } else {
          console.warn('No videos available for this movie.');
        }
      });
    }
  }
  
  private sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getVideoUrl(): SafeResourceUrl {
    if (this.videoInfo && this.videoInfo.key) {
      return this.sanitizeUrl(
        `https://www.youtube.com/embed/${this.videoInfo.key}`
      );
    } else {
      console.warn('No video information available');
      return '';
    }
  }

  closePlayer() {
    this.isPlayerVisible = false;
  }

}