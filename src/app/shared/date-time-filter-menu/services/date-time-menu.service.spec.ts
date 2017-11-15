import { TestBed, inject } from '@angular/core/testing';

import { DateTimeMenuService } from './date-time-menu.service';

describe('DateTimeMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateTimeMenuService]
    });
  });

  it('should be created', inject([DateTimeMenuService], (service: DateTimeMenuService) => {
    expect(service).toBeTruthy();
  }));
});
