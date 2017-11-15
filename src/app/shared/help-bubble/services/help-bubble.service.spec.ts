import { TestBed, inject } from '@angular/core/testing';

import { HelpBubbleService } from './help-bubble.service';

describe('HelpBubbleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelpBubbleService]
    });
  });

  it('should be created', inject([HelpBubbleService], (service: HelpBubbleService) => {
    expect(service).toBeTruthy();
  }));
});
