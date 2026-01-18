import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-public-layout',
  imports: [RouterModule, Navbar, Footer],
  templateUrl: './public-layout.html',

})
export class PublicLayout {

}
