import { TestBed, inject } from '@angular/core/testing';

import { OnePageHeaderService } from './one-page-header.service';

describe('OnePageHeaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnePageHeaderService]
    });
  });

  it('should be created', inject([OnePageHeaderService], (service: OnePageHeaderService) => {
    expect(service).toBeTruthy();
  }));
});
