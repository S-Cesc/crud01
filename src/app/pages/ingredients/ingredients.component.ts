import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { LateralMenuComponent } from '../../shared/components/lateral-menu/lateral-menu.component';
import { IIngredient, hasIngredientIdDefined } from '../../model/interfaces';
import { IngredientsService } from '../../services/ingredients.service';
import { serviceStatusResult } from '../../model/services-addons';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [HeaderComponent, LateralMenuComponent, FooterComponent, 
          MatButtonModule, MatIconModule, NgFor, RouterLink],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.scss'
})
export class IngredientsComponent implements OnInit {
  ingredientsService = inject(IngredientsService);
  title: string ;
  ingredients!: IIngredient[];

  constructor(private router: Router) {
    this.title = 'Ingredients';
  }

  ngOnInit(): void {
    this.ingredients = this.ingredientsService.getIngredients()
  }

  hasId(ing: IIngredient) {
    return hasIngredientIdDefined(ing);
  }

  editDetail(id: string) {
    this.router.navigate(['/detail', id]);
  }

  deleteIngredient(ing: IIngredient) {
    if (confirm(`Esborrar ingredient ${ing.nom}?`)) {
      const status = this.ingredientsService.deleteIngredient(ing);
      if (status == serviceStatusResult.ok) {
        this.ngOnInit();
      } else {
        // TODO
        //this.errorTextHTML = `<b>ERROR</b>: ${status}`;
      }
    }
  }
}
