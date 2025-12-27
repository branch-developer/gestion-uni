import { Component } from '@angular/core';
import { IndexRoutingModule } from "./index-routing-module";
import { Router } from '@angular/router';



@Component({
  selector: 'app-index',
  templateUrl: './index.html',

  imports: [IndexRoutingModule]
})
export class IndexComponent {

  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
