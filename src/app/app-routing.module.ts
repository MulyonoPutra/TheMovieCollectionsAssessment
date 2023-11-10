import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './core/components/layout/layout.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '',
				loadComponent: () =>
					import('../app/features/movie-list/movie-list.component').then((m) => m.MovieListComponent),
			},
			{
				path: 'movie-detail/:id',
				loadComponent: () =>
					import('../app/features/movie-detail/movie-detail.component').then((m) => m.MovieDetailComponent),
			},
			{
				path: 'favorites',
				loadComponent: () =>
					import('../app/features/favorite/favorite.component').then((m) => m.FavoriteComponent),
			},
			{
				path: 'search',
				loadComponent: () =>
					import('../app/features/search-results/search-results.component').then(
						(m) => m.SearchResultsComponent,
					),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
