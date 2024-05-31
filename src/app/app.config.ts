import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({ "projectId": "crud01-e4119",
      "appId": "1:174911916992:web:a6a1f576833ec9b9fed625", "storageBucket": "crud01-e4119.appspot.com",
      "apiKey": "AIzaSyCoctVyKrUsx1DXas_11DzdPneqGBtYQRY", "authDomain": "crud01-e4119.firebaseapp.com",
      "messagingSenderId": "174911916992", "measurementId": "G-3TJPYTDZZR" })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideHttpClient()
  ]
};
