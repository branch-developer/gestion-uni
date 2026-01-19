import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../../../services/users';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionService } from '../../../../services/notificacion';

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
    private router: Router,
    private notify: NotificacionService
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
        
        this.notify.show('Error al cargar los datos del usuario', 'error');
        
        // Redirección inmediata
        this.router.navigate(['/dashboard/usuarios']);
      }
    });
  }

  submitForm() {
    if (this.usuarioForm.invalid) {
      this.markFormGroupTouched(this.usuarioForm);
      const passwordControl = this.usuarioForm.get('password');
    if (passwordControl?.invalid && !this.isEditMode) {
      if (passwordControl?.errors?.['required']) {
        this.notify.show('La contraseña es obligatoria para nuevos usuarios', 'error');
      } else if (passwordControl?.errors?.['minlength']) {
        this.notify.show('La contraseña debe tener al menos 6 caracteres', 'error');
      }
      return;
    }

    // Mensaje genérico para otros campos
    this.notify.show('Por favor revisa los campos marcados en rojo', 'error');
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
        // Definimos el mensaje según la acción
        const mensaje = this.usuarioToEdit 
          ? 'Usuario actualizado con éxito' 
          : 'Usuario creado con éxito';

        // Llamamos al servicio de notificación visual
        this.notify.show(mensaje, 'success');

        this.submitting = false;
        this.router.navigate(['/dashboard/usuarios']);
      },
      error: (err) => {
        console.error(err);
        const errorMsg = err.error?.detail || err.error?.message || 'Error al procesar la solicitud';
        
        this.notify.show(errorMsg, 'error');
        
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
