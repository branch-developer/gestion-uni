import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAdminP } from './perfil-admin-p';

describe('PerfilAdminP', () => {
  let component: PerfilAdminP;
  let fixture: ComponentFixture<PerfilAdminP>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilAdminP]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilAdminP);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
