import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.html',
  standalone: true,
  imports: [RouterLink]   // 👈 ESTA LÍNEA ES LA CLAVE
})
export class InscripcionComponent {}
