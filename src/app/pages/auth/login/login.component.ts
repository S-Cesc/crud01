import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { MatCard, MatCardContent, MatCardActions, MatCardHeader } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { regExps } from '../../../util/custom.validator';
import { GUIerrorType, errorMessages, formActions, formLabels, hintMessages, pageNames } from '../../../util/errors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, FooterComponent, MatFormFieldModule,
    MatCard, MatCardHeader, MatCardContent, MatCardActions, MatInputModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  hidePassword: boolean;
  credentials!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.hidePassword = true;
  }

  errors = errorMessages;
  hints = hintMessages;
  pageNames = pageNames;
  formLabels = formLabels;
  formActions = formActions;

  get pattern() {
    return regExps['password'];
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
      Validators.pattern(this.pattern)]]
    });
  }

  obrirCondicions() {
    // Converts the route into a string that can be used 
    // with the window.open() function
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/condicions`])
    );
    window.open(url, '_blank');
  }

  async login() {
    const user = await this.authService.login(this.credentials.value);
    if (user) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      const err = new Error(this.errors["formulari"]);
      err.name = GUIerrorType.FormError;
      throw err;
    }
  }

}

