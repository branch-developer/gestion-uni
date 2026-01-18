import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cursos.html',
  
})
export class CursosComponent {

   constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
