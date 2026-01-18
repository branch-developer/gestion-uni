import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.html',
  standalone: true,
  imports: [RouterLink, RouterModule]   
})
export class InscripcionComponent {}
