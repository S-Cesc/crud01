import { Component, Input, OnInit, Output, EventEmitter, NgModule } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IIngredient } from '../../../model/interfaces';
import { NomIdiomes } from '../../../model/types';
import { Nomidioma, StrIdiomes, NivellLimitacioDietaProteica, getNamesNivellLimitacioDietaProteica, ajutDietesProteiques } from '../../../model/enums';
import { CommonModule } from '@angular/common';
import { isNullOrEmpty } from '../../../util/util';

@Component({
  selector: 'app-form-ingredient',
  standalone: true,
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
  ],
  templateUrl: './form-ingredient.component.html',
  styleUrl: './form-ingredient.component.scss'
})
export class FormIngredientComponent implements OnInit {
  @Input() initialIngredient?: IIngredient;
  @Input() textHTML: string;
  @Input() 
  set clearForm(value: boolean) {
    if (value) {
      this.reset();
    }
    this._clearForm = value;
  }
  get clearForm(): boolean {
    return this._clearForm;
  }
  @Output() submitIngredient = new EventEmitter<IIngredient | undefined>();
  @Output() formChanged = new EventEmitter<void>();

  strLan: Nomidioma[];
  StrNivellLimitacioDietaProteica: string[];
  ingredientForm: FormGroup;

  private _clearForm: boolean;

  constructor(private formBuilder: FormBuilder) {
    this._clearForm = false;
    this.ingredientForm = this.createForm();
    this.textHTML = "";
    this.strLan = [];
    StrIdiomes.forEach(e => this.strLan.push(e));
    this.StrNivellLimitacioDietaProteica = getNamesNivellLimitacioDietaProteica();
  }

  ngOnInit(): void {
    if (this.initialIngredient != undefined) {
      this.fillForm(this.initialIngredient);
    }
  }

  createForm() : FormGroup {
    const langSubform = new FormGroup({});
    StrIdiomes.forEach((lan) => langSubform.addControl(lan, new FormControl('', [])));
    return new FormGroup({
      id: new FormControl<number|undefined>(undefined),
      nom: new FormControl<string>('', Validators.required),
      idioma: new FormControl<string>('', Validators.required),
      nom_idiomes: langSubform,
      dietaProteica: new FormControl<string>(''),
      descripcio: new FormControl<string>('')
    });
  }

  fillForm(ing: IIngredient) {
    this.ingredientForm.controls["id"].addValidators(Validators.required);
    this.ingredientForm.controls["id"].setValue(ing.id);
    this.ingredientForm.controls["nom"].setValue(ing.nom);
    this.ingredientForm.controls["idioma"].setValue(ing.lang);
    const subformNomIdiomes = this.ingredientForm.controls["nom_idiomes"] as FormGroup;
    StrIdiomes.forEach(e => {
      if (subformNomIdiomes.contains(e)) {
        subformNomIdiomes.controls[e].setValue(ing.nom_idiomes[e]);
      }
    });
    this.ingredientForm.controls["dietaProteica"].setValue(ing.dieta);
    this.ingredientForm.controls["descripcio"].setValue(ing.descripció);
  }

  public pendingForm() :boolean {
    return !this.ingredientForm.pristine && this.ingredientForm.valid;
  }

  public changeLang(event: any) {
    const actualValue = event.target.value;
    const subForm = (this.ingredientForm.controls["nom_idiomes"]) as FormGroup;
    const valTextIdioma : string = subForm.controls[actualValue].value;
    if (isNullOrEmpty(valTextIdioma)) {
      subForm.controls[actualValue].setValue(this.ingredientForm.controls["nom"].value);
    }
  }

  public changeDiet(event: any) {
    const actualValue = event.target.value;
    console.log(actualValue);    
  }

  public submitButton(): void {
    function readLangSubform(subForm: any) : NomIdiomes {
      let tmpValues = Object.keys(subForm).filter(key => !isNullOrEmpty(subForm[key])).map((key) => [key, subForm[key]]);
      let result: NomIdiomes = { };
      tmpValues.forEach(item => {
        let langName = item[0] as Nomidioma;
        result[langName] = item[1];
      });
      return result;
    }
    function readForm(f :FormGroup) :IIngredient {
      return {
        "id": f.controls["id"].value,
        "nom": f.controls["nom"].value,
        "lang": f.controls["idioma"].value,
        "nom_idiomes": readLangSubform(f.controls["nom_idiomes"].value),
        "descripció": f.controls["descripcio"].value,
        "origen": undefined
      }
    }
    if (this.ingredientForm.valid) {
      this.submitIngredient.emit(readForm(this.ingredientForm));
    }
  }

  public cancelButton() {
    this.submitIngredient.emit(undefined);
  }

  public reset(): void {
    this.ingredientForm.reset();
  }

  keyPress(event: KeyboardEvent) {
    if (this.clearForm) {
      this.clearForm = false;
      this.formChanged.emit();
    }
  }

}
