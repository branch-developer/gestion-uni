import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLeccion } from './crear-leccion';

describe('CrearLeccion', () => {
  let component: CrearLeccion;
  let fixture: ComponentFixture<CrearLeccion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearLeccion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearLeccion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
