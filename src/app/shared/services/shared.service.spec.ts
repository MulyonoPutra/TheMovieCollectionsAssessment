import { SharedService } from './shared.service';
import { TestBed } from '@angular/core/testing';

describe('SharedService', () => {
  let sharedService: SharedService;

	beforeEach(() => {
		TestBed.configureTestingModule({
      providers: [SharedService],
    });
    sharedService = TestBed.inject(SharedService);
	});

	it('should be created', () => {
    expect(sharedService).toBeTruthy();
	});

  it('should have an initial menuItem$ observable with no subscribers', () => {
    const menuItemSpy = jasmine.createSpy('menuItemSpy');
    const subscription = sharedService.menuItem$.subscribe(menuItemSpy);

    expect(menuItemSpy).not.toHaveBeenCalled();

    subscription.unsubscribe();
  });

  it('should send a menuItemId to subscribers when sendMenuItemId is called', () => {
    const menuItemSpy = jasmine.createSpy('menuItemSpy');
    const subscription = sharedService.menuItem$.subscribe(menuItemSpy);

    const menuItemId = 42;
    sharedService.sendMenuItemId(menuItemId);

    expect(menuItemSpy).toHaveBeenCalledWith(menuItemId);

    subscription.unsubscribe();
  });

  it('should have multiple subscribers and notify all of them when sendMenuItemId is called', () => {
    const menuItemSpy1 = jasmine.createSpy('menuItemSpy1');
    const menuItemSpy2 = jasmine.createSpy('menuItemSpy2');

    const subscription1 = sharedService.menuItem$.subscribe(menuItemSpy1);
    const subscription2 = sharedService.menuItem$.subscribe(menuItemSpy2);

    const menuItemId = 42;
    sharedService.sendMenuItemId(menuItemId);

    expect(menuItemSpy1).toHaveBeenCalledWith(menuItemId);
    expect(menuItemSpy2).toHaveBeenCalledWith(menuItemId);

    subscription1.unsubscribe();
    subscription2.unsubscribe();
  });
});
