import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Md5 } from 'ts-md5';
import { isNullOrEmpty, removeSpacesAlsoNonbreakables, plainLowerCaseString, passwordPattern } from '../../util/util';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from "@angular/platform-browser";
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { LateralMenuComponent } from '../../shared/components/lateral-menu/lateral-menu.component';
import { userProfile } from '../../model/types';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, 
    HeaderComponent, 
    FooterComponent,
    LateralMenuComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  authService = inject(AuthService);

  title: string;
  errorTextHTML: string;
  email: string;
  hidePassword: boolean;
  wait: boolean;
  checkedInvalidDisplayNames: string[];
  checkedValidDisplayNames: string[];
  profileForm: FormGroup;
  profileImgUrl?: string | null;
  displayName?: string | null;


  constructor(
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer,
    fb: FormBuilder
  ) {
    this.title = "Dades de l'usuari";
    this.errorTextHTML = "";
    this.email = "";
    this.hidePassword = true;
    this.wait = false;
    this.checkedInvalidDisplayNames = [];
    this.checkedValidDisplayNames = [];
    this.profileForm = this.createForm(fb);
    matIconRegistry.addSvgIcon(
      "gravatar",
      domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/gravatar.svg"));    
  }

  ngOnInit() {
    const currentUser = this.authService.currentUser;
    if (currentUser) {
      this.fillForm(currentUser);
    }
    else {
      /* PAGE ERROR! */
      throw "User is not logged in!"
    }
  }

  createForm(fb: FormBuilder) : FormGroup {
    return fb.group({
      newDisplayName: ['', [Validators.required, Validators.minLength(2)]],
      photoURL: [''],
      password: ['', [Validators.required]]
    });
  }

  fillForm(usr: userProfile) {
    const userVerified = usr.emailVerified;
    this.email = usr.email! + (userVerified? "" : " ?");
    console.log(userVerified? "User verified" : "User email pending verification");
    this.displayName = usr.displayName?? undefined;
    this.profileImgUrl = usr.photoURL?? null;
    this.profileForm.controls["newDisplayName"].setValue(usr.displayName);
    this.profileForm.controls["photoURL"].setValue(usr.photoURL);
  }

  get userValidated(): boolean {
    const currentUser = this.authService.currentUser;
    return currentUser?.emailVerified ?? false;
  }
  get readyToSubmit(): boolean {
    return this.profileForm.controls["newDisplayName"].valid;
  }
  get pattern() {
    return passwordPattern;
  }
  get displayNameDefined() {
    return !isNullOrEmpty(this.displayName);
  }
  get displayNameValueChanged() {
    const actualValue = this.authService.currentUser?.displayName;
    return this.displayNameDefined && 
      (isNullOrEmpty(actualValue) || plainLowerCaseString(this.displayName!) != plainLowerCaseString(actualValue!));
  }

  imgUrlInputEvent($event: any) {
    const newValue = $event.target.value as string | null | undefined;
    if (isNullOrEmpty(newValue)) this.profileImgUrl = null;
    else if (newValue!.indexOf("@") > 0) {
      this.profileImgUrl = null;
      this.profileForm.controls['photoURL'].setValue(null);
    }
    else this.profileImgUrl = $event.target.value;
  }

  nomInputEvent($event: any) {
    const newValue = isNullOrEmpty($event.target.value as string | null | undefined)?
       null : $event.target.value as string;
    const newValueTransformed = newValue === null ? null : plainLowerCaseString(newValue);
    this.displayName = isNullOrEmpty(newValueTransformed)? null : newValue;
  }
  
  async nomFocusOutEvent($event: any) {
    let newDisplayNameValid: boolean;
    this.wait = true;
    if (this.displayNameValueChanged) {
      const displayName = plainLowerCaseString(this.displayName!);
      if (this.checkedInvalidDisplayNames.indexOf(displayName) < 0) {
        if (this.checkedValidDisplayNames.indexOf(displayName) < 0) {
          /* fem la petició al servei */
          const currentUser = this.authService.currentUser;
          if (currentUser) newDisplayNameValid = await this.authService.validUserNewDisplayName(displayName);
          else throw "No user logged in." /* wait flag incorrecte no importa gaire */          
          if (newDisplayNameValid) {
            /* el DisplayName és vàlid, i l'afegim a la llista de verificats per evitar fer una altra crida al servei */
            this.checkedValidDisplayNames.push(plainLowerCaseString(displayName));
          } else {
            /* el DisplayName ja existeix; l'afegim a la llista de verificats invàlids */
            this.checkedInvalidDisplayNames.push(plainLowerCaseString(displayName));
          }
        } else {
          /* DisplayName vàlid, però ja s'ha provat */
          /* en aquest temps podria haver canviat a invàlid, però això no es pot evitar, és només una comprovació del GUI */
        }
      } else {
        /* DisplayName invàlid que ja es va provar */
      }
    }
    /* restaura l'accés al control (disabled=false) */
    this.wait = false;
  }

  imgFromGravatar() {
    const currentUser = this.authService.currentUser;
    if (currentUser && currentUser.emailVerified) {
      this.profileImgUrl = removeSpacesAlsoNonbreakables("https://www.gravatar.com/avatar/"
                           + Md5.hashStr(currentUser.email.trim().toLowerCase())+"?d=mp");
      this.profileForm.controls['photoURL'].setValue(this.profileImgUrl);
    }
  }

  removeImg() {
    this.profileImgUrl = null;
    this.profileForm.controls["photoURL"].setValue(this.profileImgUrl);
    this.profileForm.controls["photoURL"].reset();
  }

  async submit() {
    const currentUser = this.authService.currentUser;
    if (currentUser && currentUser.emailVerified) {
      let formValue = this.profileForm.value;
      const password = formValue["password"];
      delete formValue["password"];
      console.log(formValue);
      await this.authService.updateUserProfile(formValue)
      .then(() => { 
        const currentUser = this.authService.currentUser;
        if (currentUser) this.fillForm(currentUser);
        else throw "Invalid user."
      })
      .catch((error) => { this.errorTextHTML = error; });
    } else {
      throw "Invalid user."
    }
  }
}


