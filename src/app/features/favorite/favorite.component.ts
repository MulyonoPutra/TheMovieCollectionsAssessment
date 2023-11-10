import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MovieDetail } from 'src/app/core/models/movie-detail';
import { Router } from '@angular/router';

@Component({
	selector: 'app-favorite',
	standalone: true,
	imports: [CommonModule, ComponentsModule, LazyLoadImageModule],
	templateUrl: './favorite.component.html',
	styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
	movies!: MovieDetail[];

	router = inject(Router);

	ngOnInit(): void {
		this.getlocalStore();
	}

	getlocalStore(): MovieDetail[] {
		const localStore = localStorage.getItem('MOVIES')!;
		return (this.movies = JSON.parse(localStore));
	}

	trackById(index: number, item: MovieDetail): number {
		return item.id;
	}

	onNavigate(id: number): void {
		this.router.navigateByUrl('/movie-detail/' + id);
	}
}
