import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizarCertificados } from './autorizar-certificados';

describe('AutorizarCertificados', () => {
  let component: AutorizarCertificados;
  let fixture: ComponentFixture<AutorizarCertificados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutorizarCertificados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorizarCertificados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
