import { Injectable } from '@angular/core';
import { IIngredient } from '../model/interfaces';
import { serviceStatusResult, uuidv4Random } from '../model/services-addons';
import { isNullOrEmpty } from '../util/util';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor() { }

  getIngredients(): IIngredient[] {
    try {
      return this.unsafeGetIngredients();
    } catch {
      return [];
    }
  }

  getIngredientById(id: string): IIngredient | undefined {
    try {
      return this.unsafeGetIngredientById(id);
    } catch {
      return undefined;
    }
  }

  getIngredientByName(nom: string): IIngredient | undefined {
    try {
      const ingredients = this.unsafeGetIngredients();
      return ingredients.find(ing => ing.nom == nom);
    } catch {
      return undefined;
    }
  }

  getFilteredIngredients(like: string | string[]): IIngredient[] {
    try {
      var likeLst : string[];
      if (Array.isArray(like)) { likeLst = like; }
      else {
        const re = /\s+(or|\|)\s+/gi;
        likeLst = like.split(re);
      }
      likeLst.forEach((item, i, likeLst) => { likeLst[i] = item.toLowerCase(); });
      const ingredients = this.unsafeGetIngredients();
      return ingredients.filter((item) => {
        const itemNom = item.nom.toLowerCase();
        return likeLst.findIndex(element => itemNom.includes(element)) >= 0;
      });
    } catch {
      return [];
    }
  }

  private unsafeGetIngredients(): IIngredient[] {
    const value = window.localStorage.getItem('ingredients');
    if (value != null) return JSON.parse(value);
    else { return []; }
  }

  private unsafeGetIngredientById(id: string): IIngredient | undefined {
    const ingredients = this.unsafeGetIngredients();
    return ingredients.find(ing => ing.id == id);
  }

  private generateUuid(): string {
    let tmpId = uuidv4Random();
    while (this.unsafeGetIngredientById(tmpId) !== undefined) {
      tmpId = uuidv4Random();
    }
    return tmpId;
  }

  insertIngredient(ingredient: IIngredient): serviceStatusResult {
    try {
      const ingredients = this.unsafeGetIngredients();
      let e: number;
      if (ingredient.id === undefined || ingredient.id !== null || ingredient.id != "") {
        ingredient.id = this.generateUuid();
      } else {
        e = ingredients.findIndex(ing => ing.id == ingredient.id);
        if (e >= 0) {
          return serviceStatusResult.attemptToDuplicateItem;
        }
      }
      e = ingredients.findIndex(ing => ing.nom == ingredient.nom);
      if (e >= 0) {
        return serviceStatusResult.attemptToDuplicateItem;
      }
      ingredients.push(ingredient);
      return this.save(ingredients);
    } catch {
      return serviceStatusResult.unexpectedError;
    }
  }

  saveIngredient(ingredient: IIngredient): serviceStatusResult {
    try {
      const ingredients = this.unsafeGetIngredients();
      let e: number;
      if (isNullOrEmpty(ingredient.id)) {
        ingredient.id = this.generateUuid();
        e = ingredients.findIndex(ing => ing.nom == ingredient.nom);
        if (e < 0) {
          return serviceStatusResult.itemNotFound;
        }
      } else {
        e = ingredients.findIndex(ing => ing.id == ingredient.id);
        if (e < 0) {
          return serviceStatusResult.itemNotFound;
        }
      }
      ingredients[e] = ingredient;
      return this.save(ingredients);
    } catch {
      return serviceStatusResult.unexpectedError;
    }
  }

  deleteIngredient(ingredient: IIngredient): serviceStatusResult {
    try {
      const ingredients = this.unsafeGetIngredients();
      let e: number;
      /* ingredientId és obligatori, però el nom també és únic */
      if (typeof ingredient.id !== "undefined" && ingredient.id !== null && ingredient.id != "") {
        e = ingredients.findIndex(ing => ing.id == ingredient.id);
      } else {
        e = ingredients.findIndex(ing => ing.nom == ingredient.nom);
      }
      if (e >= 0) {
        ingredients.splice(e, 1);
        return this.save(ingredients);
      } else {
        return serviceStatusResult.itemNotFound;
      }
    } catch {
      return serviceStatusResult.unexpectedError;
    }
  }

  private save(ingredients: IIngredient[]) : serviceStatusResult {
    try {
      window.localStorage.setItem('ingredients', JSON.stringify(ingredients));
    } catch {
      return serviceStatusResult.unexpectedError;
    }
    return serviceStatusResult.ok;
  }

}
