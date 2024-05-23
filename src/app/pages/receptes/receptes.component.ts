import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { LateralMenuComponent } from '../../shared/components/lateral-menu/lateral-menu.component';

@Component({
  selector: 'app-receptes',
  standalone: true,
  imports: [HeaderComponent, LateralMenuComponent, FooterComponent],
  templateUrl: './receptes.component.html',
  styleUrl: './receptes.component.scss'
})
export class ReceptesComponent {
    title: string = "";

    constructor() {
      this.title = 'Receptes';
    }

}
