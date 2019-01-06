import { TestBed } from '@angular/core/testing';

import { ProcescoService } from './procesco.service';

describe('ProcescoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcescoService = TestBed.get(ProcescoService);
    expect(service).toBeTruthy();
  });
});
