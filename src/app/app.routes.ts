import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { map, pipe } from 'rxjs';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate, emailVerified } from '@angular/fire/auth-guard';
import { Auth } from '@angular/fire/auth';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { RecoveryComponent } from './pages/auth/recovery/recovery.component';
import { UserProfileComponent } from './pages/auth/user-profile/user-profile.component';
import { CondicionsComponent } from './pages/auth/condicions/condicions.component';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { NouIngredientComponent } from './pages/nou-ingredient/nou-ingredient.component';
import { IngredientDetailComponent } from './pages/ingredient-detail/ingredient-detail.component';
import { CercadorIngredientComponent } from './pages/cercador-ingredient/cercador-ingredient.component';
import { ReceptesComponent } from './pages/receptes/receptes.component';
import { NovaReceptaComponent } from './pages/nova-recepta/nova-recepta.component';
import { ChangeEmailComponent } from './pages/auth/change-email/change-email.component';

const redirectUnauthorizedToLogin = () =>  redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['private/receptes']);
const redirectUnverifiedToProfile = () => redirectUnverifiedTo(['user-profile']);

const redirectUnverifiedTo = (redirect: any[]) => pipe(emailVerified, map(emailVerified => emailVerified || redirect));
// const redirectUnverifiedTo = (redirect: any[]) => pipe(emailVerified,
//                                                         map(emailVerified => emailVerified && authService.userHasDisplayName()),
//                                                          map(emailVerifiedWithDisplayName => emailVerifiedWithDisplayName || redirect));

export const routes: Routes = [
    { path: '', redirectTo: 'private/receptes',  pathMatch: 'full' },
    { path: 'home', redirectTo: 'private/receptes',  pathMatch: 'full'  },
    { path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToHome) },
    { path: 'register', component: RegisterComponent, ...canActivate(redirectLoggedInToHome) },
    { path: 'recovery', component: RecoveryComponent, ...canActivate(redirectLoggedInToHome) },
    { path: 'user-profile', component: UserProfileComponent, ...canActivate(redirectUnauthorizedToLogin) },
    { path: 'change-email', component: ChangeEmailComponent, ...canActivate(redirectUnauthorizedToLogin) },
    { path: 'private', ...canActivate(redirectUnverifiedToProfile), children: [
        { path: 'receptes', component: ReceptesComponent },
        { path: 'ingredients', component: IngredientsComponent },
        { path: 'nou-ingredient', component: NouIngredientComponent },
        { path: 'cercador-ingredient', component: CercadorIngredientComponent },
        { path: 'ingredient-detail/:id', component: IngredientDetailComponent },
        { path: 'nova-recepta', component: NovaReceptaComponent },
        { path: '**', pathMatch: 'full', component: PagenotfoundComponent }, 
    ]},
    { path: 'condicions', component: CondicionsComponent },
    { path: 'aboutus', component: AboutusComponent },
    { path: '**', pathMatch: 'full', component: PagenotfoundComponent }, 
];
