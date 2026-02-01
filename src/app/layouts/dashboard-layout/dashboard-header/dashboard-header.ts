import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { RouterModule, Router, } from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-header.html',

})
export class DashboardHeader {

  constructor(private router: Router, private auth: AuthService) {}

  sidebarOpen = true; // controla el sidebar
  logoutModalOpen = false; // controla el modal

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  openLogoutModal() {
    this.logoutModalOpen = true;
  }

  closeLogoutModal() {
    this.logoutModalOpen = false;
  }

  confirmLogout() {
    this.auth.logout(); // acción real de logout
    try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (e) {}
      this.router.navigate(['/login']);
    this.logoutModalOpen = false;
  }
}

