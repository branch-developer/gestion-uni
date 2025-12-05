import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosDisponibles } from './cursos-disponibles';

describe('CursosDisponibles', () => {
  let component: CursosDisponibles;
  let fixture: ComponentFixture<CursosDisponibles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursosDisponibles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosDisponibles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
