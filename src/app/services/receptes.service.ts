import { Injectable } from '@angular/core';
import { IRecepta } from '../model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReceptesService {

  constructor() { }

  getReceptes(): IRecepta[] {
    if (window.localStorage.getItem('receptes') != null)
      return JSON.parse(window.localStorage.getItem('receptes')!);
    else { return []; }
  }

  setRecepta(recepta: IRecepta) {
    const receptes = this.getReceptes();
    receptes.push(recepta);
    window.localStorage.setItem('receptes', JSON.stringify(receptes));
  }

}
