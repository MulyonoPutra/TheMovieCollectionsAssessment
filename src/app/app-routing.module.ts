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
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
