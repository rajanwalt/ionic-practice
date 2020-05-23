import { TestBed } from '@angular/core/testing';

import { SocialMediaSharingService } from './social-media-sharing.service';

describe('SocialMediaSharingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocialMediaSharingService = TestBed.get(SocialMediaSharingService);
    expect(service).toBeTruthy();
  });
});
