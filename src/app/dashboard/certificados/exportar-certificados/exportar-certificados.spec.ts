import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportarCertificados } from './exportar-certificados';

describe('ExportarCertificados', () => {
  let component: ExportarCertificados;
  let fixture: ComponentFixture<ExportarCertificados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportarCertificados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportarCertificados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
