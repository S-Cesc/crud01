import { Nomidioma } from "./enums";
import { NomIdiomes } from "./types";
import { Taxon, CategoriaRecepta, Tecnica, StrNivellLimitacioDietaProteica } from "./enums";
import { unitatTemps, unitatQuantitat, origenRecepta } from "./enums";

export interface IIngredient {
    id?: string;
    lang: string;
    nom: string;
    nom_idiomes: NomIdiomes;
    descripció?: string;
    dieta: StrNivellLimitacioDietaProteica,
    exclouDiabetic?: boolean,
    exclouCelliac?: boolean,
    exclouIslamic?: boolean,
    exclouJueu?: boolean,
    exclouPaleo?: boolean,
    altVitaminaK?:boolean,
    origen?: string[]; /* referència a altres ingredients; permet gestionar alèrgies */
}

export interface IRecepta {
    id?: string;
    títol: string;
    idioma: Nomidioma;
    tàxon: Taxon;
    categoria: CategoriaRecepta;
    tècnica: Tecnica;
    temps: { temps: number; unitatTemps: unitatTemps };
    ExclouJueu: boolean; /* aquest cas és per receptes de làctics i carn */
    descripció?: string;
    ingredients: { ingredient: IIngredient; q: number; um: unitatQuantitat }[];
    passos: string[];
    origenRecepta: origenRecepta;
}

export function hasIngredientIdDefined(ing: IIngredient): boolean {
    return typeof ing.id !== 'undefined' && ing.id != null && ing.id != "";
}

export function hasReceptaIdDefined(rec: IIngredient): boolean {
    return typeof rec.id !== 'undefined' && rec.id != null && rec.id != "";
}
