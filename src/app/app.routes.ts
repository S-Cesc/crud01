import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { ReceptesComponent } from './pages/receptes/receptes.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { NovaReceptaComponent } from './pages/nova-recepta/nova-recepta.component';
import { NouIngredientComponent } from './pages/nou-ingredient/nou-ingredient.component';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { IngredientDetailComponent } from './pages/ingredient-detail/ingredient-detail.component';
import { CercadorIngredientComponent } from './pages/cercador-ingredient/cercador-ingredient.component';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate, emailVerified, AuthPipeGenerator } from '@angular/fire/auth-guard';
import { LoginComponent } from './pages/login/login.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { map, of, pipe, switchMap } from 'rxjs';

const redirectUnauthorizedToLogin = () => redirectUnverifiedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['private/receptes']);

const redirectUnverifiedTo = (redirect: any[]) => pipe(emailVerified, map(emailVerified => emailVerified || redirect));


export const routes: Routes = [
    { path: '', redirectTo: 'private/receptes',  pathMatch: 'full' },
    { path: 'home', redirectTo: 'private/receptes',  pathMatch: 'full'  },
    { path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToHome) },
    { path: 'register', component: RegisterComponent, ...canActivate(redirectLoggedInToHome) },
    { path: 'private', ...canActivate(redirectUnauthorizedToLogin), children: [
        { path: 'receptes', component: ReceptesComponent },
        { path: 'ingredients', component: IngredientsComponent },
        { path: 'nou-ingredient', component: NouIngredientComponent },
        { path: 'cercador-ingredient', component: CercadorIngredientComponent },
        { path: 'ingredient-detail/:id', component: IngredientDetailComponent },
        { path: 'nova-recepta', component: NovaReceptaComponent },
        { path: 'user-profile', component: UserProfileComponent },
        { path: '**', pathMatch: 'full', component: PagenotfoundComponent }, 
    ]},
    { path: 'aboutus', component: AboutusComponent },
    { path: '**', pathMatch: 'full', component: PagenotfoundComponent }, 
];
