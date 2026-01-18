import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
})
export class Navbar {

    constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  menuOpen = false;
  
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}