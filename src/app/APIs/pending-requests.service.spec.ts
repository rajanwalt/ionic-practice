import { TestBed } from '@angular/core/testing';

import { PendingRequestsInterceptor } from './pending-requests.service';

describe('PendingRequestsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PendingRequestsInterceptor = TestBed.get(PendingRequestsInterceptor);
    expect(service).toBeTruthy();
  });
});
