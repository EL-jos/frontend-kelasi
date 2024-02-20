import { TestBed } from '@angular/core/testing';

import { MomentJSService } from './moment-js.service';

describe('MomentJSService', () => {
  let service: MomentJSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MomentJSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
