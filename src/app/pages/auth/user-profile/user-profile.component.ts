import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Md5 } from 'ts-md5';
import { isNullOrEmpty, removeSpacesAlsoNonbreakables, plainLowerCaseString } from '../../../util/util';
import { errorMessages, formActions, formLabels, hintMessages, Idioma, idiomes, pageNames } from '../../../util/errors';
import { DisplayNameValidator, regExps } from '../../../util/custom.validator';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { DomSanitizer } from "@angular/platform-browser";
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { LateralMenuComponent } from '../../../shared/components/lateral-menu/lateral-menu.component';
import { userProfile } from '../../../model/types';
import { GUIerrorType } from '../../../util/errors';


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
    MatButtonModule,
    MatSelectModule,
    MatTabsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  private authService = inject(AuthService);

  title: string;
  email: string;
  hidePassword: boolean;
  profileForm: FormGroup;
  profileOptionsForm: FormGroup;
  profileImgUrl?: string | null;
  displayName?: string | null;
  idioma?: string | null;

  firstProfileName: string = "";
  secondProfileName: string = "";
  thirdProfileName: string = "";

  constructor(
    private cd: ChangeDetectorRef,
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer,
    fb: FormBuilder
  ) {
    this.title = pageNames["profile"];
    this.email = "";
    this.hidePassword = true;
    this.profileForm = this.createForm(fb);
    this.profileOptionsForm = this.createForm2(fb);
    matIconRegistry.addSvgIcon(
      "gravatar",
      domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/gravatar.svg"));    
  }

  errors = errorMessages;
  hints = hintMessages;
  pageNames = pageNames;
  formLabels = formLabels;
  formActions = formActions;
  idiomes = idiomes;

  ngOnInit() {
    const currentUser = this.authService.currentUser;
    if (currentUser && currentUser.email) {
      this.fillForm(currentUser);
    } else {
      /* PAGE ERROR! */
      const err =  new Error(errorMessages["senseUsuari"]);
      err.name = GUIerrorType.FormError;
      throw err;
    }
  }

  createForm(fb: FormBuilder) : FormGroup {
    return fb.group({
      newDisplayName: ['', 
                      [Validators.required, Validators.minLength(3)],
                      [DisplayNameValidator.createValidator(this.authService)]],
      photoURL: [''],
      password: ['', [Validators.required]]
    });
  }

  createForm2(fb: FormBuilder) : FormGroup {
    return fb.group({
      firstProfile: [''],
      secondProfile: [''],
      thirdProfile: [''],
    });
  }

  fillForm(usr: userProfile) {
    /* dades que depenen de usr */
    const userVerified = usr.emailVerified;
    this.email = usr.email! + (userVerified? "" : " ?");
    console.log(userVerified? "User verified" : "User email pending verification");
    this.displayName = usr.displayName?? undefined;
    this.profileImgUrl = usr.photoURL?? null;
    /* primer form */
    this.profileForm.controls["newDisplayName"].setValue(usr.displayName);
    this.profileForm.controls["photoURL"].setValue(usr.photoURL);
    /* segon form */
  }

  get userValidated(): boolean {
    const currentUser = this.authService.currentUser;
    return currentUser?.emailVerified ?? false;
  }
  get currentDisplayNameDefined() {
    return !isNullOrEmpty(this.displayName);
  }
  get userValidatedWithDisplayname(): boolean {
    const currentUser = this.authService.currentUser;
    if (!!currentUser) {
      return currentUser.emailVerified && !!(currentUser.displayName);
    } else return false;
  }
  get readyToSubmit(): boolean {
    return this.userValidated && this.profileForm.controls["newDisplayName"].valid &&
    this.profileForm.controls['photoURL'].valid &&
      (this.profileForm.controls['newDisplayName'].value != this.displayName
       || this.profileForm.controls['photoURL'].value != this.authService.currentUser?.photoURL);
  }
  get pattern() {
    return regExps['password'];
  }
  get langFlag() {
    if (!!this.idioma) return this.idiomes.find(x => x.value == this.idioma)?.img;
    else return null;
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
      await this.authService.updateUserProfile(password, formValue);
      this.profileForm.controls["password"].setValue("");
    } else {
      const err = new Error(errorMessages["senseUsari"] + " - " + errorMessages["usuariNoValidat"]);
      err.name = GUIerrorType.AuthenticationError;
      throw err;
    }
  }
}


