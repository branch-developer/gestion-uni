import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CursosService } from '../../../services/cursos';

interface Curso {
  id: number;
  titulo: string;
  descripcion: string;
}

@Component({
  selector: 'app-cursos-disponibles',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [CursosService],
  templateUrl: './cursos-disponibles.html'
})
export class CursosDisponiblesComponent implements OnInit {

  catalogo: Curso[] = [];

  constructor(
    private router: Router,
    private cursosService: CursosService
  ) {}

  ngOnInit() {
    this.cursosService.getCursos().subscribe(cursos => {
      this.catalogo = cursos;
    });
  }

  cargarCursosDisponibles() {
    this.cursosService.getCursos().subscribe({
      next: (cursos: any[]) => {
        this.catalogo = cursos
          .filter(c => c.estado === 'activo') // solo publicados
          .map(c => ({
            id: c.id,
            titulo: c.titulo,
            descripcion: c.descripcion_breve || c.descripcion
          }));
      },
      error: (err) => {
        console.error('Error cargando cursos', err);
      }
    });
  }

  volverPerfil() {
    this.router.navigate(['/dashboard/perfil-alumno']);
  }
}
