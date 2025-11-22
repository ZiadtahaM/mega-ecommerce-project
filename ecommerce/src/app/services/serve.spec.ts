import { TestBed } from '@angular/core/testing';

import { Serve } from './serve';

describe('Serve', () => {
  let service: Serve;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Serve);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
