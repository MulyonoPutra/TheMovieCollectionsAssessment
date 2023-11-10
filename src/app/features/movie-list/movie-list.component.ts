import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MovieService } from 'src/app/core/services/movie.service';
import { MovieTrendingComponent } from './pages/movie-trending/movie-trending.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, ComponentsModule, MovieTrendingComponent],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, OnDestroy {
  constructor(private readonly moviesService: MovieService) {}

  ngOnInit(): void {
    this.findAllTrendings();
  }

  ngOnDestroy(): void {}

  tabs = [
    { label: 'Day', classes: 'inline-block p-4 rounded-t-lg' },
    { label: 'This Week', classes: 'inline-block p-4 rounded-t-lg' },
  ];

  activeTabIndex = 0;
  setActiveTab(index: number): void {
    this.activeTabIndex = index;
  }

  findAllTrendings() {
    this.moviesService.findTrendingMovies('day').subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
}
