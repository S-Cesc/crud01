import { Component, Input, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { userProfile } from '../../../model/types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatCardModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService);
  
  @Input({ required: true }) title!: string;
  @Input() errorTextHTML?: string;

  constructor(private router: Router) { }

  get currentUser(): userProfile | null {
    return this.authService.currentUser;
  }

  get profileImgUrl(): string | null {
    return this.currentUser?.photoURL ?? null;
  }

  get isLoggedIn(): boolean {
    return this.currentUser?.emailVerified ?? false;
  }

  clicUserProfile() {
    if (this.isLoggedIn) {
      this.router.navigate(['private/user-profile']);
    } else {
      this.router.navigate(['login']);
    }
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['login']);
    })
  }

}
