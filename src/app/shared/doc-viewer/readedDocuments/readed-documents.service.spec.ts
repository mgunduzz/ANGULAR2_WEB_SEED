import { TestBed, inject } from '@angular/core/testing';

import { ReadedDocumentsService } from './readed-documents.service';

describe('ReadedDocumentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReadedDocumentsService]
    });
  });

  it('should be created', inject([ReadedDocumentsService], (service: ReadedDocumentsService) => {
    expect(service).toBeTruthy();
  }));
});
