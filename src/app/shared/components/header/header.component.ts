import { Component, Input, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { userProfile } from '../../../model/types';
import { GUIerrorType, errorMessages } from '../../../util/errors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatCardModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService);
  
  @Input() title?: string;

  constructor(private router: Router) { }

  get currentUser(): userProfile | null {
    return this.authService.currentUser;
  }

  get profileImgUrl(): string | null {
    return this.currentUser?.photoURL ?? null;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  clicUserProfile() {
    if (this.isLoggedIn) {
      this.router.navigate(['/user-profile']);
    } else {
      this.router.navigate(['login']);
    }
  }

  logout() {
    this.authService.logout()
    .then(() => this.router.navigate(['login']))
    .catch(() => {
      const err = new Error(errorMessages["serveiLogout"]);
      err.name = GUIerrorType.AuthenticationError;
      throw err;   
    });

  }

}
