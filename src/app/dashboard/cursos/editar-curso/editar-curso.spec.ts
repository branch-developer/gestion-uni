import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCurso } from './editar-curso';

describe('EditarCurso', () => {
  let component: EditarCurso;
  let fixture: ComponentFixture<EditarCurso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarCurso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCurso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
