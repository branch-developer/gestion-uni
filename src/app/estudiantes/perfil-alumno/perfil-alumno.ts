import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-alumno',
  standalone: true,
  templateUrl: './perfil-alumno.html',
  styleUrls: ['./perfil-alumno.css']
})

export class PerfilAlumnoComponent {  // ← Corregido: nombre completo

  showContent(sectionId: string): void {
    // Ocultar todas las secciones
    document.querySelectorAll<HTMLElement>('.content-section').forEach(section => 
      section.classList.remove('active')
    );
    
    document.querySelectorAll<HTMLButtonElement>('.tabs button').forEach(button => 
      button.classList.remove('active')
    );
    
    // Mostrar la sección y el botón seleccionados
    const section = document.getElementById(sectionId);
    const button = document.getElementById('btn-' + sectionId);

    if (section) {
      section.classList.add('active');
    }
    if (button) {
      button.classList.add('active');
    }
  }
}

