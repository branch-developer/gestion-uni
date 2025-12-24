import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-evaluacion',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './evaluacion.html',
  styleUrls: ['./evaluacion.css']
})
export class EvaluacionComponent {
}