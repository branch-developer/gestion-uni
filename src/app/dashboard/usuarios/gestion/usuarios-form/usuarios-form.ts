import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../../../services/users';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuarios-form.html',
})
export class UsuariosFormComponent implements OnInit {

  usuarioToEdit: any = null;
  usuarioForm!: FormGroup;
  roles = ['estudiante', 'profesor', 'AdminC', 'AdminP'];
  submitting = false;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombre_completo: ['', Validators.required],
      username: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['estudiante', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadUserForEdit(+id);
    }
  }

  loadUserForEdit(id: number) {
    this.usersService.getUserById(id).subscribe({
      next: (user) => {
        this.usuarioToEdit = user;
        this.usuarioForm.patchValue({
          nombre_completo: user.nombre_completo,
          username: user.username,
          correo: user.correo,
          rol: user.rol
        });
        this.usuarioForm.get('password')?.clearValidators();
        this.usuarioForm.get('password')?.updateValueAndValidity();
      },
      error: (err) => {
        console.error(err);
        alert('Error al cargar usuario');
        this.router.navigate(['/dashboard/usuarios']);
      }
    });
  }

  submitForm() {
    if (this.usuarioForm.invalid) {
      this.markFormGroupTouched(this.usuarioForm);
      alert('Por favor completa todos los campos correctamente');
      return;
    }

    this.submitting = true;
    const data = { ...this.usuarioForm.value };

    if (this.isEditMode && !data.password) {
      delete data.password;
    }

    const request = this.usuarioToEdit
      ? this.usersService.updateUser(this.usuarioToEdit.id_usuario, data)
      : this.usersService.createUser(data);

    request.subscribe({
      next: () => {
        alert(this.usuarioToEdit ? 'Usuario actualizado con éxito' : 'Usuario creado con éxito');
        this.submitting = false;
        this.router.navigate(['/dashboard/usuarios']);
      },
      error: (err) => {
        console.error(err);
        const errorMsg = err.error?.detail || err.error?.message || 'Error al procesar la solicitud';
        alert(errorMsg);
        this.submitting = false;
      }
    });
  }

  cancelForm() {
    if (confirm('¿Deseas cancelar? Los cambios no guardados se perderán.')) {
      this.router.navigate(['/dashboard/usuarios']);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}
