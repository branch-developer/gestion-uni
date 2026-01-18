import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../services/users';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Usuario {
  id_usuario: number;
  nombre_completo: string;
  username: string;
  correo: string;
  telefono?: string;
  rol: string;
  estado: boolean;
  fecha_registro: string;
}

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './usuarios-list.html',
})
export class UsuariosListComponent implements OnInit {

  usuarios: Usuario[] = [];
  roles = ['estudiante', 'profesor', 'AdminC', 'AdminP'];

  editingUserId: number | null = null;
  editForm!: FormGroup;

  changingPasswordUserId: number | null = null;
  passwordForm!: FormGroup;

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      nombre_completo: ['', Validators.required],
      username: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required]
    });

    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usersService.getUsers().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => {
        console.error(err);
        alert('Error al cargar usuarios');
      }
    });
  }

  activar(usuario: Usuario) {
    if (confirm(`¿Activar el usuario ${usuario.nombre_completo}?`)) {
      this.usersService.activarUsuario(usuario.id_usuario).subscribe({
        next: () => {
          alert('Usuario activado exitosamente');
          this.loadUsuarios();
        },
        error: (err) => {
          console.error(err);
          alert('Error al activar usuario');
        }
      });
    }
  }

  desactivar(usuario: Usuario) {
    if (confirm(`¿Desactivar el usuario ${usuario.nombre_completo}?`)) {
      this.usersService.desactivarUsuario(usuario.id_usuario).subscribe({
        next: () => {
          alert('Usuario desactivado exitosamente');
          this.loadUsuarios();
        },
        error: (err) => {
          console.error(err);
          alert('Error al desactivar usuario');
        }
      });
    }
  }

  cambiarRol(usuario: Usuario, event: Event) {
    const rol = (event.target as HTMLSelectElement).value;
    if (confirm(`¿Cambiar el rol de ${usuario.nombre_completo} a ${rol}?`)) {
      this.usersService.cambiarRol(usuario.id_usuario, rol).subscribe({
        next: () => {
          alert('Rol actualizado exitosamente');
          this.loadUsuarios();
        },
        error: (err) => {
          console.error(err);
          alert('Error al cambiar rol');
        }
      });
    }
  }

  startEdit(usuario: Usuario) {
    this.editingUserId = usuario.id_usuario;
    this.editForm.patchValue({
      nombre_completo: usuario.nombre_completo,
      username: usuario.username,
      correo: usuario.correo,
      rol: usuario.rol
    });
  }

  cancelEdit() {
    this.editingUserId = null;
    this.editForm.reset();
  }

  saveEdit(usuario: Usuario) {
    if (this.editForm.invalid) {
      alert('Por favor completa todos los campos correctamente');
      return;
    }

    const data = this.editForm.value;
    this.usersService.updateUser(usuario.id_usuario, data).subscribe({
      next: () => {
        alert('Usuario actualizado exitosamente');
        this.editingUserId = null;
        this.loadUsuarios();
      },
      error: (err) => {
        console.error(err);
        alert('Error al actualizar usuario');
      }
    });
  }

  startPasswordChange(usuario: Usuario) {
    this.changingPasswordUserId = usuario.id_usuario;
    this.passwordForm.reset();
  }

  cancelPasswordChange() {
    this.changingPasswordUserId = null;
    this.passwordForm.reset();
  }

  savePassword(usuario: Usuario) {
    if (this.passwordForm.invalid) {
      alert('Por favor completa los campos de contraseña');
      return;
    }

    const { newPassword, confirmPassword } = this.passwordForm.value;

    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.usersService.cambiarPassword(usuario.id_usuario, newPassword).subscribe({
      next: () => {
        alert('Contraseña actualizada exitosamente');
        this.changingPasswordUserId = null;
        this.passwordForm.reset();
      },
      error: (err) => {
        console.error(err);
        alert('Error al cambiar contraseña');
      }
    });
  }

  isEditing(usuario: Usuario): boolean {
    return this.editingUserId === usuario.id_usuario;
  }

  isChangingPassword(usuario: Usuario): boolean {
    return this.changingPasswordUserId === usuario.id_usuario;
  }
}
