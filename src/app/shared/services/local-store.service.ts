import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LocalStoreService {
	setItem(key: string, value: unknown): void {
		localStorage.setItem(key, JSON.stringify(value));
	}

	getItem(key: string) {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : null;
	}

	removeItem(key: string): void {
		localStorage.removeItem(key);
	}

	clear(): void {
		localStorage.clear();
	}
}
