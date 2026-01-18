import { TestBed } from '@angular/core/testing';

import { Lecciones } from './lecciones';

describe('Lecciones', () => {
  let service: Lecciones;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Lecciones);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
