import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientsService } from '../../services/ingredients.service';
import { IIngredient } from '../../model/interfaces';
import { FormIngredientComponent } from '../../shared/components/form-ingredient/form-ingredient.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { LateralMenuComponent } from '../../shared/components/lateral-menu/lateral-menu.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { serviceStatusResult } from '../../model/services-addons';
import { errorMessages } from '../../util/errors';

@Component({
  selector: 'app-ingredient-detail',
  standalone: true,
  imports: [HeaderComponent, LateralMenuComponent, FooterComponent, FormIngredientComponent],
  templateUrl: './ingredient-detail.component.html',
  styleUrl: './ingredient-detail.component.scss'
})
export class IngredientDetailComponent implements OnInit {
  title: string;
  ing!: IIngredient;
  private ingredientsService: IngredientsService;
 
  constructor(private router: Router, 
              private activateRoute: ActivatedRoute) {
    this.ingredientsService = inject(IngredientsService);
    this.title = 'Editar ingredient';
  }

  errors = errorMessages;

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.ing = this.ingredientsService.getIngredientById(params['id'])!;
    })
  }

  saveIngredient(ingredient?: IIngredient) {
//TODO - servei asíncron
//El servei ha de retornar un observable
// saveIngredient() {
//  this.service.saveIngredient().subscribe((results) => {
//    console.log('Data is received - Result - ', results);
//    this.data = results.results;
//  })
//}
// compte cas ingredient === undefined (cancel)
//TODO - bloqueig del botó

  if (ingredient === undefined) {
      this.router.navigate(['/private/ingredients']);
    } else {
        const r = this.ingredientsService.saveIngredient(ingredient);
        if (r != serviceStatusResult.ok) {
          const err = new Error(r); //r.toString()
          err.name = this.errors["ingredientsServiceError"];
          throw err;
        }
    }
  }

}
