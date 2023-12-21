import { TestBed } from '@angular/core/testing';

import { CreateguildService } from './create-guild-service.service';

describe('CreateGuildServiceService', () => {
  let service: CreateguildService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateguildService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
