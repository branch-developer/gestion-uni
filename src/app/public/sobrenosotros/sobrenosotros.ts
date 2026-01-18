import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sobrenosotros',
  templateUrl: './sobrenosotros.html',
  standalone: true,
  imports: [RouterModule]
})
export class SobrenosotrosComponent {

 constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
