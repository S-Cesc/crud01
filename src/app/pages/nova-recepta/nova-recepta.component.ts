import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { LateralMenuComponent } from '../../shared/components/lateral-menu/lateral-menu.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IRecepta } from '../../model/interfaces';
import { Nomidioma, StrIdiomes } from '../../model/enums';

@Component({
  selector: 'app-nova-recepta',
  standalone: true,
  imports: [
    HeaderComponent, LateralMenuComponent, FooterComponent,
    ReactiveFormsModule
  ],
  templateUrl: './nova-recepta.component.html',
  styleUrl: './nova-recepta.component.scss'
})
export class NovaReceptaComponent {
  title: string = "";
  receptaForm: FormGroup;
  anteriorNom = "";

  constructor(private formBuilder: FormBuilder) {
    this.title = 'Nova recepta';
    this.receptaForm = this.formBuilder.group({
    })
  }

}
