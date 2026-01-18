import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.html',
  standalone: true,
  imports: [RouterModule]
})
export class ContactoComponent {

 constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}



