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
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
