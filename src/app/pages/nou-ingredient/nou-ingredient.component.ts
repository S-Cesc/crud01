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
  errorTextHTML: string;
  textHTML: string;
  clearForm: boolean;
  


  constructor(private router: Router) {
    this.ingredientsService = inject(IngredientsService);
    this.title = 'Nou ingredient';
    this.errorTextHTML = "";
    this.textHTML = "";
    this.clearForm = false;
  }

  onSubmitIngredient(ing?: IIngredient) {
    if (ing === undefined) {
      this.router.navigate(['/ingredients']);
    } else {
      const nom = ing.nom;
      const result = this.ingredientsService.insertIngredient(ing);
      if (result === serviceStatusResult.ok) {
        this.textHTML = `L'ingredient <b>${nom}</b> s'ha desat.`;
        this.errorTextHTML = "";
        this.clearForm = true;
      } else {
        this.errorTextHTML = `<b>ERROR</b>: ${result}`
        this.textHTML = "";
        this.clearForm = false;
      }
    }
  }

  onFormChanged() {
    if (this.clearForm) {
      this.errorTextHTML = "";
      this.textHTML = "";
      this.clearForm = false;
    }
  }

}
