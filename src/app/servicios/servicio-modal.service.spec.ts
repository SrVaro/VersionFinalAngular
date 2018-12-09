import { TestBed } from '@angular/core/testing';

import { ServicioModalService } from './servicio-modal.service';

describe('ServicioModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioModalService = TestBed.get(ServicioModalService);
    expect(service).toBeTruthy();
  });
});
