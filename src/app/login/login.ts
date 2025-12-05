import { routes } from './../app.routes';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  email = '';
  password = '';

  private router = inject(Router);
  private auth = inject(AuthService);

  submit() {
    // basic validation
    if (!this.email || !this.password) {
      alert('Please enter email and password');
      return;
    }

    // fake login
    this.auth.login(this.email, this.password);

    // redirect to home
    this.router.navigate(['/home']);
  }
}

