import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleLeccion } from './detalle-leccion';

describe('DetalleLeccion', () => {
  let component: DetalleLeccion;
  let fixture: ComponentFixture<DetalleLeccion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleLeccion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleLeccion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
