import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { MovieDetail } from 'src/app/core/models/movie-detail';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
	selector: 'app-favorite',
	standalone: true,
	imports: [CommonModule, ComponentsModule, LazyLoadImageModule, TranslateModule],
	templateUrl: './favorite.component.html',
	styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
	movies!: MovieDetail[];

	private readonly router = inject(Router);
	private readonly localStore = inject(LocalStoreService);

	ngOnInit(): void {
		this.getlocalStore();
	}

	getlocalStore(): MovieDetail[] {
		return (this.movies = this.localStore.getItem('MOVIES'));
	}

	trackById(index: number, item: MovieDetail): number {
		return item.id;
	}

	onNavigate(id: number): void {
		this.router.navigateByUrl('/movie-detail/' + id);
	}
}
