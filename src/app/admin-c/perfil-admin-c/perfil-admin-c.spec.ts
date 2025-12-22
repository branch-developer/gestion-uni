import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAdminCComponent } from './perfil-admin-c';

describe('PerfilAdminCComponent', () => {
  let component: PerfilAdminCComponent;
  let fixture: ComponentFixture<PerfilAdminCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilAdminCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilAdminCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
