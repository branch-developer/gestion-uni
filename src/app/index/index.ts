import { Component } from '@angular/core';
import { IndexRoutingModule } from "./index-routing-module";

@Component({
  selector: 'app-index',
  templateUrl: './index.html',
  styleUrls: ['./index.css'],
  imports: [IndexRoutingModule]
})
export class IndexComponent {}