import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../../services/cursos';
import { Leccion, Modulo, CursoDetalle } from '../../../core/models/curso';

@Component({
  selector: 'app-detalle-curso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-curso.html',
  styles: [`
    :host { display: block; }
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-in {
      animation: fade-in 0.4s cubic-bezier(0, 0, 0.2, 1);
    }
  `]
})

export class DetalleCursoComponent implements OnInit {

  cursoActivo = signal<CursoDetalle | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cursosService: CursosService
  ) {}

  ngOnInit(): void {
    const cursoId = Number(this.route.snapshot.paramMap.get('id'));
    if (cursoId) {
      this.cargarCurso(cursoId);
    }
  }

  cargarCurso(id: number) {
    this.cursosService.getCurso(id).subscribe({
      next: (curso) => {
        this.cursoActivo.set({
          id: curso.id!,
          titulo: curso.titulo!,
          descripcion: curso.descripcion!,
          profesor: curso.profesor!,
          inscrito: curso.inscrito ?? false,
          estadoInscripcion: curso.estadoInscripcion, // 🔥 CLAVE
          modulos: curso.modulos?.map((m) => ({
            id: m.id!,
            titulo: m.titulo!,
            orden: m.orden!,
            lecciones: m.lecciones?.map((l) => ({
              id: l.id!,
              titulo: l.titulo!,
              contenido: curso.estadoInscripcion === 'aprobado'
                ? l.contenido
                : null,
              orden: l.orden!
            })) || []
          })) || []
        });
      },
        error: () => {
          alert('No se pudo cargar el curso');
          this.router.navigate(['/dashboard/cursos-disponibles']);
        }
    });
  }


  getcurso() {
    return this.cursoActivo();
  }

  volverCursos() {
    this.router.navigate(['/dashboard/cursos-disponibles']);
  }

  irALeccion(leccion: Leccion) {
    if (!this.cursoActivo()?.inscrito) return;
    this.router.navigate(['/dashboard/cursos/lecciones', leccion.id]);
  }

  inscribirse() {
    const curso = this.cursoActivo();
    if (!curso || curso.inscrito) {
      alert('Ya estás inscrito en este curso');
      return;
    }
    this.router.navigate(['/dashboard/inscripciones/inscripcion-form', curso.id]);
  }

  volverMisCursos() {
    this.router.navigate(['/dashboard/mis-cursos']);
  }

  irAEvaluacion() {
    const curso = this.cursoActivo();
    if (!curso) return;
    this.router.navigate(['/dashboard/evaluaciones/responder', curso.id]);
  }


}
