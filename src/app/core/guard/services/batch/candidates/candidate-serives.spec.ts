import { TestBed } from '@angular/core/testing';

import { CandidateSerives } from './candidate-serives';

describe('CandidateSerives', () => {
  let service: CandidateSerives;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateSerives);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
