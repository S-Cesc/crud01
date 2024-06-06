import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ConfirmValidParentMatcher, CustomValidators, regExps } from '../../../util/custom.validator';
import { errorMessages, formActions, formLabels, GUIerrorType, hintMessages, pageNames } from '../../../util/errors';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [[ReactiveFormsModule, HeaderComponent, FooterComponent, MatFormFieldModule,
    MatCard, MatCardHeader, MatCardContent, MatCardActions, MatInputModule, MatIconModule, MatButtonModule, RouterLink],],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  hidePassword: boolean;
  hidePasswordAgain: boolean;
  wait: boolean;
  credentials!: FormGroup;
  confirmValidParentMatcher!: ConfirmValidParentMatcher;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.hidePassword = true;
    this.hidePasswordAgain = true;
    this.wait = false;
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
    this.confirmValidParentMatcher = new ConfirmValidParentMatcher();
    const emailGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      emailAgain: ['', [Validators.required, Validators.email]],
    }, { validator: CustomValidators.childrenEqual });
    const passwordGroup = this.fb.group({
      password: ['', [Validators.required,
      Validators.minLength(8), Validators.maxLength(24),
      Validators.pattern(this.pattern)]],
      passwordAgain: ['', [Validators.required,
      Validators.minLength(8), Validators.maxLength(24),
      Validators.pattern(this.pattern)]]
    }, { validator: CustomValidators.childrenEqual });
    this.credentials = this.fb.group({
      emailGroup: emailGroup,
      passwordGroup: passwordGroup
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

  async register() {
    try {
      this.wait = true;
      if (this.credentials.valid) {
        const emailGroup: FormGroup = this.credentials.controls["emailGroup"] as FormGroup;
        const passwordGroup: FormGroup = this.credentials.controls["passwordGroup"] as FormGroup;
        let credentials = { 
          email: emailGroup.controls["email"].value,
          password: passwordGroup.controls["password"].value
        };
        const user = await this.authService.register(credentials);
        if (user) {
          passwordGroup.controls["password"].setValue("");
          passwordGroup.controls["passwordAgain"].setValue("");
          this.router.navigateByUrl('/home', { replaceUrl: true });
        } else {
          const err = new Error(this.errors["serveiRegistre"]);
          err.name = GUIerrorType.AuthenticationError;
          throw err;
        }
      } else {
        const err = new Error(this.errors["formulari"]);
        err.name = GUIerrorType.FormError;
        throw err;
      }
    } finally {
      this.wait = false;
    }

  }

}
