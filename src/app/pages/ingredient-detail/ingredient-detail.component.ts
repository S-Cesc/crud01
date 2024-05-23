import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientsService } from '../../services/ingredients.service';
import { IIngredient } from '../../model/interfaces';
import { FormIngredientComponent } from '../../shared/components/form-ingredient/form-ingredient.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { LateralMenuComponent } from '../../shared/components/lateral-menu/lateral-menu.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { serviceStatusResult } from '../../model/services-addons';

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
  errorTextHTML: string;
  private ingredientsService: IngredientsService;
 
  constructor(private router: Router, 
              private activateRoute: ActivatedRoute) {
    this.ingredientsService = inject(IngredientsService);
    this.title = 'Editar ingredient';
    this.errorTextHTML = "";
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.ing = this.ingredientsService.getIngredientById(params['id'])!;
    })
  }

  saveIngredient(ingredient?: IIngredient) {
    if (ingredient === undefined) {
      this.router.navigate(['/ingredients']);
    } else {
      const r = this.ingredientsService.saveIngredient(ingredient);
      switch (r) {
        case serviceStatusResult.ok: 
          this.router.navigate(['/ingredients']);
          break;
        default:
          this.errorTextHTML = r.toString();
        }
    }
  }
}
