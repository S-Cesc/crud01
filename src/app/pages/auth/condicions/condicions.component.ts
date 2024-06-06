import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-condicions',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './condicions.component.html',
  styleUrl: './condicions.component.scss'
})
export class CondicionsComponent {

}
