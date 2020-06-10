import { TestBed } from '@angular/core/testing';

import { RouterStateService } from './router-state.service';

describe('RouterStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouterStateService = TestBed.get(RouterStateService);
    expect(service).toBeTruthy();
  });
});
