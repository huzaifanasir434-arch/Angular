import { Component, signal } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
// import { MedicalForm } from './medical-form/medical-form';
// import { Contact } from "./contact/contact";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'My Standalone Angular App';
}
