import { TestBed, inject } from '@angular/core/testing';

import { ShareLinkGeneratorService } from './share-link-generator.service';

describe('ShareLinkGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShareLinkGeneratorService]
    });
  });

  it('should be created', inject([ShareLinkGeneratorService], (service: ShareLinkGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
