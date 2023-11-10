import { Movie } from './movie';

export interface Trending extends Movie {
	media_type: string;
	name?: string;
	original_name?: string;
	first_air_date?: string;
	origin_country?: string[];
}
