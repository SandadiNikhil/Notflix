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

  // getMovieDetails(id: number | null) {
  //   if (id) {
  //     this.movieService.getMovieDetails(id);
  //     this.movieService.movieDetails$.subscribe((res) => {
  //       this.movieDetails = res;
  //       console.log('this.movieDetails', this.movieDetails);
  //     });
  //   }
  // }

  getMovieDetails(id: number | null) {
    if (id) {
      this.movieService.getMovieDetails(id);
      this.movieService.movieDetails$.subscribe((res) => {
        if (res) {
          this.movieDetails = res;
          console.log('Movie Details:', this.movieDetails);
        } else {
          console.error('No movie details found for ID:', id);
        }
      });
    } else {
      console.error('Invalid movie ID:', id);
    }
  }

  // getVideo(id: number | null) {
  //   if (id) {
  //     this.movieService.getVideo(id).subscribe((res: any) => {
  //       console.log('Get Video Info', res);
  //       this.videoDetails = res.results;

  //       console.log('this.videoDetails', this.videoDetails);

  //       if (this.videoDetails) {
  //         this.videoInfo = this.videoDetails.find(() => true);
  //         console.log('firstObject', this.videoInfo.key);
  //         this.isPlayerVisible = true;
  //       }
  //     });
  //   }
  // }

  getVideo(id: number | null, type: 'play' | 'trailer') {
    if (id !== null) {
      this.movieService.getVideo(id).subscribe((res: any) => {
        console.log('Get Video Info', res);
        this.videoDetails = res.results;
  
        if (this.videoDetails) {
          this.videoInfo = this.videoDetails.find(() => true);
          console.log('firstObject', this.videoInfo.key);
  
          if (type === 'play') {
            console.log('Playing the movie...');
            this.isPlayerVisible = true;
          } else if (type === 'trailer') {
            console.log('Showing the trailer...');
            this.isPlayerVisible = true;
          }
        }
      });
    }
  }

  closePlayer() {
    this.isPlayerVisible = false;
  }

  private sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // getVideoUrl(): SafeResourceUrl {
  //   if (this.videoInfo) {
  //     return this.sanitizeUrl(
  //       `https://www.youtube.com/embed/${this.videoInfo.key}`
  //     );
  //   }
  //   return '';
  // }

  getVideoUrl(): SafeResourceUrl {
    if (this.videoInfo) {
      return this.sanitizeUrl(
        `https://www.youtube.com/embed/${this.videoInfo.key}`
      );
    } else {
      console.warn('No video information available');
      return '';
    }
  }

}



// @Component({
//   selector: 'app-movie-details',
//   standalone: false,

//   templateUrl: './movie-details.component.html',
//   styleUrl: './movie-details.component.css',
// })
// export class MovieDetailsComponent implements OnInit {
//   bgImageVariable = '';

//   movieDetails: movieDetails | null = null;
//   videoDetails: [] | null = null;
//   videoInfo: any;
//   isPlayerVisible = false;

//   constructor(
//     private movieService: MovieService,
//     private route: ActivatedRoute
//   ) {}
//   ngOnInit(): void {
//     this.route.queryParamMap.subscribe((params) => {
//       console.log('Params', params);
//       const idString = params.get('id');
//       const id = idString ? +idString : null;
//       this.getMovieDetails(id);
//     });
//   }

//   getMovieDetails(id: number | null) {
//     if (id) {
//       this.movieService.getMovieDetails(id).subscribe((res: any) => {
//         this.movieDetails = res;

//         console.log('this.movieDetails', this.movieDetails);
//       });
//     }
//   }

//   getVideo(id: number | null) {
//     if (id) {
//       this.movieService.getVideo(id).subscribe((res: any) => {
//         console.log('Get Video Info', res);
//         this.videoDetails = res.results;

//         console.log('this.videoDetails', this.videoDetails);

//         if (this.videoDetails) {
//           this.videoInfo = this.videoDetails.find(() => true);
//           console.log('firstObject', this.videoInfo.key);
//           this.isPlayerVisible = true;
//         }
//       });
//     }
//   }

//   closePlayer() {
//     this.isPlayerVisible = false;
//   }
// }
