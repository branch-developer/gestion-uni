import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderEvaluacion } from './responder-evaluacion';

describe('ResponderEvaluacion', () => {
  let component: ResponderEvaluacion;
  let fixture: ComponentFixture<ResponderEvaluacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponderEvaluacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponderEvaluacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
