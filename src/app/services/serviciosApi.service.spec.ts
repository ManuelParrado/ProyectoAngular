import { TestBed } from '@angular/core/testing';

import { ServiciosApi } from './serviciosApi.service';

describe('ServiciosApiService', () => {
  let service: ServiciosApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
