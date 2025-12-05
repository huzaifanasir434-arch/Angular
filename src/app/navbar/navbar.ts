import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  private auth = inject(AuthService);
  private router = inject(Router);

  public isLoggedIn$: Observable<boolean> = this.auth.isLoggedIn$;
userEmail: string | null = null;

  constructor() {
    // update email whenever login state changes
    this.isLoggedIn$.subscribe(isLogged => {
      this.userEmail = isLogged ? this.auth.getuserEmail() : null;
    });
  }

  authLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  // hide navbar on login/register pages
  isAuthPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }
}
