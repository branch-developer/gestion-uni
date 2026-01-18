import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirComprobante } from './subir-comprobante';

describe('SubirComprobante', () => {
  let component: SubirComprobante;
  let fixture: ComponentFixture<SubirComprobante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirComprobante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirComprobante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
