import { Component } from '@angular/core';
import { CercaIngredientComponent } from '../../shared/components/cerca-ingredient/cerca-ingredient.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { LateralMenuComponent } from '../../shared/components/lateral-menu/lateral-menu.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-cercador-ingredient',
  standalone: true,
  imports: [HeaderComponent, LateralMenuComponent, FooterComponent, CercaIngredientComponent],
  templateUrl: './cercador-ingredient.component.html',
  styleUrl: './cercador-ingredient.component.scss'
})
export class CercadorIngredientComponent {
  title: string;
  errorTextHTML: string;

  constructor() {
    this.title = "Cercador d'ingredients";
    this.errorTextHTML = "";
  }

}
