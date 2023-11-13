import { LocalStoreService } from './local-store.service';
import { TestBed } from '@angular/core/testing';

describe('LocalStoreService', () => {
	let localStoreService: LocalStoreService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LocalStoreService],
		});
		localStoreService = TestBed.inject(LocalStoreService);
	});

	it('should be created', () => {
		expect(localStoreService).toBeTruthy();
	});

	it('should set and retrieve an item from localStorage', () => {
		const key = 'testKey';
		const value = { name: 'John', age: 30 };

		localStoreService.setItem(key, value);

		const retrievedValue = localStoreService.getItem(key);

		expect(retrievedValue).toEqual(value);
	});

	it('should remove an item from localStorage', () => {
		const key = 'testKey';
		const value = { name: 'John', age: 30 };

		localStoreService.setItem(key, value);
		localStoreService.removeItem(key);

		const retrievedValue = localStoreService.getItem(key);

		expect(retrievedValue).toBeNull();
	});

	it('should clear all items from localStorage', () => {
		const key1 = 'testKey1';
		const key2 = 'testKey2';
		const value1 = { name: 'John', age: 30 };
		const value2 = { name: 'Jane', age: 25 };

		localStoreService.setItem(key1, value1);
		localStoreService.setItem(key2, value2);
		localStoreService.clear();

		const retrievedValue1 = localStoreService.getItem(key1);
		const retrievedValue2 = localStoreService.getItem(key2);

		expect(retrievedValue1).toBeNull();
		expect(retrievedValue2).toBeNull();
	});
});
