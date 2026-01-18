import { Component, OnInit, inject } from '@angular/core';
import { Inscripciones } from '../../../services/inscripciones';
import { Inscripcion } from '../../../core/models/inscripcion';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Curso } from '../../../core/models/curso';

@Component({
  selector: 'app-inscripciones-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inscripciones-list.html',
})

export class InscripcionesList {
  private inscripcionesService = inject(Inscripciones);
  inscripciones: Inscripcion[] = [];

  ngOnInit(): void {
    this.inscripcionesService.listar().subscribe(data => this.inscripciones = data);
  }

  isCursoObject(curso: number | Curso): curso is Curso {
    return typeof curso !== 'number';
  }

}