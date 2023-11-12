import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { Movie } from 'src/app/core/models/movie';
import { MovieService } from 'src/app/core/services/movie.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
	selector: 'app-search-results',
	standalone: true,
	imports: [CommonModule, ComponentsModule, LazyLoadImageModule, TranslateModule],
	templateUrl: './search-results.component.html',
	styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
	query!: string;
	movies: Movie[] = [];

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly movieService: MovieService,
	) {}

	ngOnInit(): void {
		this.route.queryParams.subscribe((params) => {
			this.query = params['query'];
			if (this.query) {
				this.movieService.search(this.query).subscribe({
					next: (data) => {
						this.movies = data.results;
					},
				});
			}
		});
	}

	trackById(index: number, item: Movie): number {
		return item.id;
	}

	onNavigate(id: number): void {
		this.router.navigateByUrl('/movie-detail/' + id);
	}
}
