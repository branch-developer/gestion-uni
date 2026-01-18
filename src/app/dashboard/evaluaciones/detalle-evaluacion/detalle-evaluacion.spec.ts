import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEvaluacion } from './detalle-evaluacion';

describe('DetalleEvaluacion', () => {
  let component: DetalleEvaluacion;
  let fixture: ComponentFixture<DetalleEvaluacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleEvaluacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleEvaluacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
