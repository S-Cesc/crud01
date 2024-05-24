import { Component, Input, OnInit, Output, EventEmitter, NgModule } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { IIngredient } from '../../../model/interfaces';
import { NomIdiomes } from '../../../model/types';
import { Nomidioma, StrIdiomes, NivellLimitacioDietaProteica, ajutDietesProteiques, StrNivellLimitacioDietaProteica, getNivellsLimitacioDietaProteica } from '../../../model/enums';
import { CommonModule } from '@angular/common';
import { isNullOrEmpty } from '../../../util/util';


import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { __values } from 'tslib';

@Component({
  selector: 'app-form-ingredient',
  standalone: true,
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule, MatSelectModule, MatInputModule,
      MatSlideToggleModule, MatButtonModule
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
  nivellsLimitacioDietaProteica: [string, NivellLimitacioDietaProteica][];
  textDieta: string;
  ingredientForm: FormGroup;

  private _clearForm: boolean;

  constructor(private formBuilder: FormBuilder) {
    this._clearForm = false;
    this.ingredientForm = this.createForm();
    this.textHTML = "";
    this.strLan = [];
    StrIdiomes.forEach(e => this.strLan.push(e));
    this.nivellsLimitacioDietaProteica = getNivellsLimitacioDietaProteica();
    this.textDieta = "";
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
      dietaProteica: new FormControl<string>('', Validators.required),
      noDiabetics : new FormControl<boolean>(false),
      noCeliacs : new FormControl<boolean>(false),
      haram : new FormControl<boolean>(false),
      taref : new FormControl<boolean>(false),
      noPaleo : new FormControl<boolean>(false),
      altK : new FormControl<boolean>(false),
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
    if (ing.dieta !== undefined) {      
      this.textDieta = ajutDietesProteiques[ing.dieta];
    }
    if (ing.exclouDiabetic !== undefined) {
      this.ingredientForm.controls["noDiabetics"].setValue(ing.exclouDiabetic);
    }
    if (ing.exclouCelliac !== undefined) {
      this.ingredientForm.controls["noCeliacs"].setValue(ing.exclouCelliac);
    }
    if (ing.exclouIslamic !== undefined) {
      this.ingredientForm.controls["haram"].setValue(ing.exclouIslamic);
    }
    if (ing.exclouJueu !== undefined) {
      this.ingredientForm.controls["taref"].setValue(ing.exclouJueu);
    }
    if (ing.exclouPaleo) {
      this.ingredientForm.controls["noPaleo"].setValue(ing.exclouPaleo);
    }
    if (ing.altVitaminaK) {
      this.ingredientForm.controls["altK"].setValue(ing.altVitaminaK);
    }

    this.changeDietValue(ing.dieta);
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
    this.changeDietValue(event.value);
  }

  private changeDietValue(actualValue: any) {
    if (actualValue === undefined) {
      this.textDieta = "Seleccioneu el màxim nivell de dieta on l'ingredient no és acceptable.";
    } else {      
      const prefix = (actualValue as StrNivellLimitacioDietaProteica === "sense_limitacio") ? "" : "No apte en: ";
      this.textDieta = prefix + ajutDietesProteiques[actualValue as StrNivellLimitacioDietaProteica];
    }
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
      let objReturn: IIngredient = {
        "id": f.controls["id"].value,
        "nom": f.controls["nom"].value,
        "lang": f.controls["idioma"].value,
        "nom_idiomes": readLangSubform(f.controls["nom_idiomes"].value),
        "dieta": f.controls["dietaProteica"].value,
        "descripció": f.controls["descripcio"].value,        
        "origen": undefined
      };
      if (f.controls["noDiabetics"].value !== undefined
        && f.controls["noDiabetics"].value) {
        objReturn.exclouDiabetic = f.controls["noDiabetics"].value;
      }
      if (f.controls["noCeliacs"].value !== undefined
        && f.controls["noCeliacs"].value) {
        objReturn["exclouCelliac"] = f.controls["noCeliacs"].value;
      }
      if (f.controls["haram"].value !== undefined
        && f.controls["haram"].value) {
        objReturn["exclouIslamic"] = f.controls["haram"].value;
      }
      if (f.controls["taref"].value !== undefined &&
      f.controls["taref"].value) {
        objReturn["exclouJueu"] = f.controls["taref"].value;
      }
      if (f.controls["noPaleo"].value !== undefined &&
      f.controls["noPaleo"].value) {
        objReturn["exclouPaleo"] =  f.controls["noPaleo"].value;
      }
      if (f.controls["altK"].value !== undefined &&
      f.controls["altK"].value) {
        objReturn["altVitaminaK"] =  f.controls["altK"].value;
      }
      return objReturn;
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
