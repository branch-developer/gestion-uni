import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionesComponent } from './evaluacion';

describe('EvaluacionesComponent', () => {
  let component: EvaluacionesComponent;
  let fixture: ComponentFixture<EvaluacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
