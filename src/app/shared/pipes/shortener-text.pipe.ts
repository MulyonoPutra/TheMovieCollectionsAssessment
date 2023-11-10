import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'shortenerText',
	standalone: true,
})
export class ShortenerTextPipe implements PipeTransform {
	transform(value: any, limit: number): string {
		if (value?.length > limit) {
			return value.substr(0, limit) + '...';
		}
		return value;
	}
}
