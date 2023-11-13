import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { HttpUrl } from '../../utils/http-url';
import { Movie } from 'src/app/core/models/movie';
import { MovieDetail } from 'src/app/core/models/movie-detail';
import { StaticIcons } from '../../static/static-icons';
import { Trending } from 'src/app/core/models/trending';

@Component({
	selector: 'app-movie-card',
	templateUrl: './movie-card.component.html',
	styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
	@Input() movies?: Trending | Movie | MovieDetail;
	@Output() clicked = new EventEmitter<number>();

	imageUrls!: string;
	isFavorite: boolean = false;

	favIcon: string = StaticIcons.fav;
  favRedIcon: string = StaticIcons.favRed;
  playIcon: string = StaticIcons.play;

	ngOnInit(): void {
		this.imageUrls = `${HttpUrl.baseImageUrl}/${HttpUrl.imageResource}/w500/${this.movies?.poster_path}`;
	}

	toggleFavorite(): void {
		this.isFavorite = !this.isFavorite;
	}

	onNavigate(): void {
		this.clicked.emit();
	}
}
