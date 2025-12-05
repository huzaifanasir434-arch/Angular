import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  name = '';
  email = '';
  password = '';

  private router = inject(Router);
  private auth = inject(AuthService);

  submit() {
    if (!this.name || !this.email || !this.password) {
      alert('Please fill all fields');
      return;
    }

    this.auth.register(this.name, this.email, this.password);
    // go to home directly after register
    this.router.navigate(['/home']);
  }
}
