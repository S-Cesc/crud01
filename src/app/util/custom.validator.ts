/*
https://obsessiveprogrammer.com/validating-confirmation-fields-in-angular-reactive-forms-with-angular-material/
by Tom Bonanno
*/

import { FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { plainLowerCaseString } from './util';


/**
 * Custom validator functions for reactive form validation
 */
export class CustomValidators {
    /**
     * Validates that child controls in the form group are equal
     */
    static childrenEqual: ValidatorFn = (formControl: AbstractControl) => {
        const formGroup = formControl as FormGroup;
        if (formGroup) {
            const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {});
            const isValid = otherControlNames.every(controlName => formGroup.get(controlName)!.value === formGroup.get(firstControlName)!.value);
            return isValid ? null : { childrenNotEqual: true } as ValidationErrors;
        } else return null;
    }
}

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
 */
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        if (control && control.parent) {
            return control.parent.invalid && control.touched;
        } else {
            return false;
        }
    }
}

/**
 * Async validator
 * from https://www.thisdot.co/blog/using-custom-async-validators-in-angular-reactive-forms
 * by Daian Scuarissi
 */
export class DisplayNameValidator {

    static createValidator(authService: AuthService): AsyncValidatorFn {
        const checkedInvalidDisplayNames: string[] = [];
        const checkedValidDisplayNames: string[] = [];
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (!control.dirty) return of(null)
            const normalizedDisplayName = plainLowerCaseString(control.value);
            if (checkedInvalidDisplayNames.indexOf(normalizedDisplayName) < 0) {
                if (checkedValidDisplayNames.indexOf(normalizedDisplayName) < 0) {
                    return authService.validUserNewDisplayName(control.value)
                        .pipe(
                            map((result: boolean) => {
                                if (result) {
                                    checkedValidDisplayNames.push(normalizedDisplayName);
                                    return null;
                                } else {
                                    checkedInvalidDisplayNames.push(normalizedDisplayName);
                                    return { displayNameAlreadyExists: true } as ValidationErrors;
                                }
                            })
                        );
                } else return of(null);
            } else { return of({ displayNameAlreadyExists: true } as ValidationErrors); }
        }
    }
}


/**
* Collection of reusable RegExps
*/
export const regExps: { [key: string]: RegExp } = {
    password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\\-\x22\x26\/\(\)'¡¿·!@#~$%=?¿ _:;+*.,]).{8,24}/
};
