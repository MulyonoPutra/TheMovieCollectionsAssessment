import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { RouterModule } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, RouterModule, LazyLoadImageModule],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  constructor(private readonly sharedService: SharedService) {}

  poster!: string;

  ngOnInit(): void {
    this.backdropReceived();
  }


  generateBackdropPath(data: any): string {
    const url: string = 'https://www.themoviedb.org/t/p';
    const filter: string = 'w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)';
    let randomIndex = Math.floor(Math.random() * data.length);
    let backdrop = data[randomIndex].backdrop_path;
    this.poster = `${url}/${filter}/${backdrop}`;
    return this.poster;
  }

  backdropReceived() {
    this.sharedService.backdrop$.subscribe({
      next: (data) => {
        this.generateBackdropPath(data);
      },
    });
  }
}
