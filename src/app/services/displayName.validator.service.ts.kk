/*
https://stackoverflow.com/questions/64678675/how-to-create-custom-forms-validator-using-a-service
by Kr1 (stackoverflow)

*/
import { Injectable, OnInit, booleanAttribute, inject } from '@angular/core'
import { AuthService } from './auth.service';
import { FormControl, ValidatorFn } from '@angular/forms'
import { Observable, from, of, timer } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { isNullOrEmpty, plainLowerCaseString } from '../util/util';
import { errorMessages } from '../util/errors';

@Injectable({
    providedIn: 'root'
})
export class IsValidNicknameService {
    private authService = inject(AuthService);
    private checkedInvalidDisplayNames: string[];
    private checkedValidDisplayNames: string[];

    constructor() {
        this.checkedInvalidDisplayNames = [];
        this.checkedValidDisplayNames = [];
    }

    validate = (time: number = 500) => {
        return (input: FormControl) => {
          return (input: FormControl) => {
            const time = 500;
            return timer(time).pipe(
                switchMap(() => this.isValidNickname(input.value)),
                map(isValid => {
                    return isValid ? null : { displayName: true }
                })
            )
        }
        }
    }


    private isValidNickname(value: string): Observable<boolean> {
        if (!isNullOrEmpty(value) && value.length >= 2) {
            const currentUser = this.authService.currentUser;
            if (currentUser) {
                const displayName = plainLowerCaseString(value);
                if (this.checkedInvalidDisplayNames.indexOf(displayName) < 0) {
                    if (this.checkedValidDisplayNames.indexOf(displayName) < 0) {
                        /* fem la petició al servei */
                        return this.isValidDisplayName(displayName);
                    } else {
                        /* DisplayName vàlid, però ja s'ha provat */
                        /* tot i que en aquest temps podria haver canviat a invàlid, 
                            això no es pot evitar, però és només una comprovació del GUI
                        */
                        return of(true);
                    }
                } else {
                    /* DisplayName invàlid que ja es va provar */
                    return of(false);
                }
            } else {
                const err = new Error(errorMessages["senseUsari"]);
                throw "No user logged in."
            }
        } else {
            /* DisplayName buit */
            return of(false);
        }
    }

    private isValidDisplayName(normalizedDisplayName: string): Observable<boolean> {
        return from(this.authService.validUserNewDisplayName(normalizedDisplayName)).pipe((x) => this.addItem(normalizedDisplayName,x))
    }

    private addItem(normalizedDisplayName: string, isValid: Observable<boolean>): Observable<boolean> {
        isValid.forEach((valid) => {
            if (valid) {
                this.checkedValidDisplayNames.push(normalizedDisplayName);
            } else {
                this.checkedInvalidDisplayNames.push(normalizedDisplayName);
            }
        });
        return isValid;
    }

}