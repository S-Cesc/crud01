import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { LateralMenuComponent } from '../../shared/components/lateral-menu/lateral-menu.component';
import { FormIngredientComponent } from '../../shared/components/form-ingredient/form-ingredient.component';
import { IngredientsService } from '../../services/ingredients.service';
import { IIngredient } from '../../model/interfaces';
import { serviceStatusResult } from '../../model/services-addons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nou-ingredient',
  standalone: true,
  imports: [
    HeaderComponent, LateralMenuComponent, FooterComponent, FormIngredientComponent
  ],
  templateUrl: './nou-ingredient.component.html',
  styleUrl: './nou-ingredient.component.scss'
})

export class NouIngredientComponent {
  title: string;
  ingredientsService: IngredientsService;
  textHTML: string;
  
  constructor(private router: Router) {
    this.ingredientsService = inject(IngredientsService);
    this.title = 'Nou ingredient';
    this.textHTML = "";
  }

  onSubmitIngredient(ing?: IIngredient) {
//TODO - servei asíncron
//El servei ha de retornar un observable
// saveIngredient() {
//  this.service.saveIngredient().subscribe((results) => {
//    console.log('Data is received - Result - ', results);
//    this.data = results.results;
//  })
//}
//TODO - bloqueig del botó

    if (ing === undefined) {
      this.router.navigate(['/private/ingredients']);
    } else {
      const nom = ing.nom;
      const result = this.ingredientsService.insertIngredient(ing);
      if (result === serviceStatusResult.ok) {
        this.textHTML = `L'ingredient <b>${nom}</b> s'ha desat.`;
      } else {
        // TODO
        //this.errorTextHTML = `<b>ERROR</b>: ${result}`
      }
    }
  }

}
