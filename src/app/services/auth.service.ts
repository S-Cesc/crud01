import { Injectable, OnDestroy, inject } from '@angular/core';
import {
  Auth, User, UserCredential,
  authState,
  browserSessionPersistence,
  createUserWithEmailAndPassword, sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from '@angular/fire/auth';
import { DocumentReference, Firestore, doc, getDoc, getFirestore, runTransaction } from '@angular/fire/firestore';
import { isNullOrEmpty, plainLowerCaseString } from '../util/util';
import { userProfile } from '../model/types';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy  {
  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;
  
  constructor(
    private db: Firestore
  ) 
  {
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
      this.auth.updateCurrentUser(aUser).then(() => console.log(aUser));
    })
  }

  ngOnDestroy(): void {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.authStateSubscription.unsubscribe();
  }

  get currentUser(): userProfile | null {
    const usrCurrent = this.auth.currentUser;
    return usrCurrent ?
      {
        "email": usrCurrent.email,
        "displayName": usrCurrent.displayName,
        "photoURL": usrCurrent.photoURL,
        "emailVerified": usrCurrent.emailVerified
      } as userProfile : null;
  }

  userHasDisplayName(): boolean {
    return !isNullOrEmpty(this.auth.currentUser?.displayName);
  }

  async register({ email, password }: { email: string; password: string }) {
    try {
      await this.auth.setPersistence(browserSessionPersistence);
      const credential = await createUserWithEmailAndPassword(this.auth, email, password);
      if (!credential?.user?.emailVerified) await sendEmailVerification(credential.user);
      return credential;
    } catch (e) {
      return null;
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    try {
      await this.auth.setPersistence(browserSessionPersistence);
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  }

  /* interactive check user display name in GUI */
  async validUserNewDisplayName(newDisplayName: string) {
    try {
      const usrCurrent = this.auth.currentUser;
      if (usrCurrent && !isNullOrEmpty(newDisplayName)
        && (!usrCurrent.displayName
          || plainLowerCaseString(newDisplayName) != plainLowerCaseString(usrCurrent.displayName))) {
        const newDisplayNameDoc = await getDoc(doc(this.db, "displayNames", newDisplayName));
        const exists = !newDisplayNameDoc.exists();
        return exists;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }

  async updateUserProfile(profile: { newDisplayName: string, photoURL: string }) {
    const usrCurrent = this.auth.currentUser;
    if (usrCurrent && !isNullOrEmpty(profile.newDisplayName)) {
        const docSnap = await getDoc(doc(this.db, "users", usrCurrent.uid));
        //transformació del perfil per valors únics
        const newDisplayName = plainLowerCaseString(profile.newDisplayName);
        //L'usuari ja te displayName
        if (docSnap.exists()) {
          // Comprovar si s'ha d'actualitzar el displayName
          // probablement user.displayName = oldDisplayName
          // però el perfil no s'actualitza en transacció
          const oldDisplayName = docSnap.data()['displayName'];
          if (oldDisplayName != newDisplayName) {
            //se ha de actualizar
            console.log("before call: ", usrCurrent.uid, oldDisplayName, newDisplayName);
            await this.updateDisplayName(this.db, usrCurrent.uid, oldDisplayName, newDisplayName);
          }
        } else {
          // requereix insert
          // generalmenteel perfil user.displayName està buit
          // però no s'actualitza en transacció
          console.log("before call: ", usrCurrent.uid, newDisplayName);
          await this.insertDisplayName(this.db, usrCurrent.uid, newDisplayName);
        }
        //TRANSACCIÓ AMB èxit (sinó hauria generat error)
        //En profile es desa el perfil sense transformar
        this.auth.authStateReady()
          .then( () => {
                updateProfile(this.auth.currentUser!, {
                    displayName: profile.newDisplayName, photoURL: profile.photoURL
                 }) })
          .then( () => { console.log("Profile updated!"); });
    } else {
      throw Error("Unauthorized access");
    }
  }

  /* TRANSACTION */
  private async updateDisplayName(db: Firestore, uid: string, oldDisplayName: string, newDisplayName: string) {
    //1) comprobar disponible (deberia estar verificado, ahora en transacción)
    // Create a reference to the DisplayName doc.
    const newDisplayNameDocRef = doc(this.db, "displayNames", newDisplayName);
    await runTransaction(db, async (transaction) => {
      const newDisplayNameDoc = await transaction.get(newDisplayNameDocRef);
      if (newDisplayNameDoc.exists()) {
        console.log(newDisplayName + " exists.")
        throw "The display name already exists!";
      } else {
        // - Eliminar oldDisplayName de displayNames
        transaction.delete(doc(db, "displayNames", oldDisplayName));
        // - Insertar newDisplayName en displayNames
        transaction.set(newDisplayNameDocRef, { uid: uid });
        // - Actualizar users valor de displayName=newDisplayName
        transaction.set(doc(db, "users", uid), { displayName: newDisplayName });
      }
    });
  }

  /* TRANSACTION */
  private async insertDisplayName(db: Firestore, uid: string, newDisplayName: string) {
    //1) comprobar disponible (deberia estar verificado, ahora en transacción)
    // Create a reference to the DisplayName doc.
    const newDisplayNameDocRef = doc(db, "displayNames", newDisplayName);
    await runTransaction(db, async (transaction) => {
      const newDisplayNameDoc = await transaction.get(newDisplayNameDocRef);
      if (newDisplayNameDoc.exists()) {
        console.log(newDisplayName + " exists.")
        throw "The display name already exists!";
      } else {
        //2) INSERT en displayNames + INSERT en users
        transaction.set(newDisplayNameDocRef, { uid: uid });
        transaction.set(doc(db, "users", uid), { displayName: newDisplayName });
      }
    });
  }


  logout() {
    return signOut(this.auth);
  }
}
