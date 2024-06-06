/**
 * Revisited from https://medium.com/@keithstric/global-angular-error-handling-8569fe8228f
 * by Keith Strickland
 * Revision in order to match with https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
 * by Kent C. Dodds
 * and typescript and angular documentation https://angular.dev/api/core/ErrorHandler
 */

import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { errorMessages, toErrorWithMessage } from '../util/errors';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
    providedIn: 'root'
})
export class ErrorService implements ErrorHandler {

    constructor(
        private _snackBar: MatSnackBar,
        private zone: NgZone) { }

    /**
     * This function is a global javascript error handler. It will catch all javascript errors
     * produced within the application. The docs at https://angular.dev/api/core/ErrorHandler
     *
     * @param err {any}
     */
    handleError(err: any) {
        // if (!(err instanceof HttpErrorResponse)) {
        //     err = err.rejection; // get the error object
        // }
        this.zone.run(() => {
                err = toErrorWithMessage(err);
                console.error(`ErrorService.handleError, ${err['name']?? "err"}` + " -> ", err);
                let errText = (err["name"]?? "Error") + ": " + err["message"];
                this._snackBar.open(errText, errorMessages['entente']);
            }
        );
    }
}