import { TestBed, inject } from '@angular/core/testing';

import { SelectedDocumentsService } from './selected-documents.service';

describe('SelectedDocumentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectedDocumentsService]
    });
  });

  it('should ...', inject([SelectedDocumentsService], (service: SelectedDocumentsService) => {
    expect(service).toBeTruthy();
  }));
});
