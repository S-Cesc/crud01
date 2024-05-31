import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { passwordPattern } from '../../util/util';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, FooterComponent, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  title: string;
  hidePassword: boolean;
  errorTextHTML: string;
  credentials!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.title = "Login";
    this.hidePassword = true;
    this.errorTextHTML = "";
  }

  get pattern() {
    return passwordPattern;
  }

  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,
                      Validators.minLength(8), Validators.maxLength(24),
                      Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\\-\x22\x26\/\(\)'¡¿·!@#~$%=?¿ _:;+*.,]).{8,24}")]]
    });
  }

  async register() {

    const user = await this.authService.register(this.credentials.value);

    if (user) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      console.log('Registration failed', 'Please try again!');
    }
  }

  async login() {

    const user = await this.authService.login(this.credentials.value);

    if (user) {
      console.log('User', user);
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      console.log('Login failed', 'Please try again!');
    }
  }

}

