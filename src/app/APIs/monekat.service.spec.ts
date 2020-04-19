import { TestBed } from '@angular/core/testing';

import { MonekatService } from './monekat.service';

describe('MonekatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonekatService = TestBed.get(MonekatService);
    expect(service).toBeTruthy();
  });
});
