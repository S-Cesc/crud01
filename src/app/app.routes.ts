import { Routes } from '@angular/router';
import { ReceptesComponent } from './pages/receptes/receptes.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { NovaReceptaComponent } from './pages/nova-recepta/nova-recepta.component';
import { NouIngredientComponent } from './pages/nou-ingredient/nou-ingredient.component';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { IngredientDetailComponent } from './pages/ingredient-detail/ingredient-detail.component';
import { CercadorIngredientComponent } from './pages/cercador-ingredient/cercador-ingredient.component';

export const routes: Routes = [
    { path: '', redirectTo: 'receptes',  pathMatch: 'full' },
    { path: 'receptes', component: ReceptesComponent },
    { path: 'ingredients', component: IngredientsComponent },
    { path: 'nou-ingredient', component: NouIngredientComponent },
    { path: 'cercador-ingredient', component: CercadorIngredientComponent },
    { path: 'ingredient-detail/:id', component: IngredientDetailComponent },
    { path: 'nova-recepta', component: NovaReceptaComponent },
    { path: 'aboutus', component: AboutusComponent },
    { path: 'home', redirectTo: 'receptes',  pathMatch: 'full'  },
    { path: '**', pathMatch: 'full', component: PagenotfoundComponent }, 
];
