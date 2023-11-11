import { ShortenerTextPipe } from './shortener-text.pipe';

describe('ShortenerTextPipe', () => {
	let pipe: ShortenerTextPipe;

	beforeEach(() => {
		pipe = new ShortenerTextPipe();
	});
	it('create an instance', () => {
		const pipe = new ShortenerTextPipe();
		expect(pipe).toBeTruthy();
	});

	it('should shorten text correctly when length is greater than limit', () => {
		const inputText = 'Lorem ipsum dolor sit amet';
		const limit = 10;
		const result = pipe.transform(inputText, limit);
		expect(result).toEqual('Lorem ipsu...');
	});

	it('should not shorten text when length is less than limit', () => {
		const inputText = 'Short text';
		const limit = 20;
		const result = pipe.transform(inputText, limit);
		expect(result).toEqual('Short text');
	});

	it('should return null when input is null', () => {
		const result = pipe.transform(null, 10);
		expect(result).toBeNull();
	});
});
