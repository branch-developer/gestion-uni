import { Component, OnInit, inject } from '@angular/core';
import { Lecciones } from '../../../services/lecciones';
import { Leccion } from '../../../core/models/leccion';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SafeUrlPipe } from '../../../shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-lecciones',
  standalone: true,
  imports: [CommonModule, HttpClientModule, SafeUrlPipe],
  templateUrl: './lecciones.html',
})
export class LeccionesComponent implements OnInit{
  lecciones: Leccion[] = [];
  private leccionesService = inject(Lecciones);

  ngOnInit(): void {
    this.leccionesService.getLecciones().subscribe({
      next: (data) => this.lecciones = data,
      error: (err) => console.error(err)
    });
  }

}
