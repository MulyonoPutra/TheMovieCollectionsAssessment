import { LoadingService } from './loading.service';
import { TestBed } from '@angular/core/testing';

describe('LoadingService', () => {
  let loadingService: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService],
    });
    loadingService = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(loadingService).toBeTruthy();
  });

  it('should initialize with visibility set to false', () => {
    expect(loadingService.visibility.value).toBe(false);
  });

  it('should set visibility to true when calling show()', () => {
    loadingService.show();
    expect(loadingService.visibility.value).toBe(true);
  });

  it('should set visibility to false when calling hide()', () => {
    loadingService.hide();
    expect(loadingService.visibility.value).toBe(false);
  });
});
