
export const StrIdiomes = ["ca", "es", "en", "fr"] as const;
export type Nomidioma = typeof StrIdiomes[number];

export enum NivellLimitacioDietaProteica {
    sense_limitacio = 'sense limitació' /* no prohibeix! */,
    hinduisme_no_vegetariana = 'hindú no vegetariana' /* Sense porc ni vacum */,
    aviram_pisci_vegetariana = 'aviram-pisci-vegetariana',
    quaresma = 'quaresma' /* aviram_pisci_vegetariana, però exclou l'anec i l'oca */,
    pisci_vegetariana = 'pisci-vegetariana',
    lacto_ovo_vegetariana = 'lacto-ovo-vegetariana',
    lacto_vegetariana = 'lacto-vegetariana' /* exclou els ous */,
    vegetariana_vegana = 'vegetariana o vegana',
    pitagorica = 'Pitagòrica: vegana sense fabes'
}
export type StrNivellLimitacioDietaProteica = keyof typeof NivellLimitacioDietaProteica;

export function getNamesNivellLimitacioDietaProteica(): string[] {
    return Object.values(NivellLimitacioDietaProteica);
}
export const ajutDietesProteiques: {[dieta in StrNivellLimitacioDietaProteica]: string } = {
    "sense_limitacio": 'Sense limitació.',
    "hinduisme_no_vegetariana": 'Sense porc ni vacum.',
    "aviram_pisci_vegetariana": 'Vegetariana amb aus i peix.',
    "quaresma": "Aviram-pisci-vegetariana que exclou l'ànec i l'oca.",
    "pisci_vegetariana": 'Vegetariana amb ous, làctis i peix.',
    "lacto_ovo_vegetariana": 'Vegetariana amb ous i làctics.',
    "lacto_vegetariana": 'Vegetariana amb làctics.',
    "vegetariana_vegana": "Només vegetals, sense productes d'origen animal.",
    "pitagorica": "Vegana sense fabes."
}


export const enum AltresLimitacionsDieta {
    paleo = 'paleo (sense cereals ni làctics)' /* sense cereals ni làctics */,
    celliac = 'celiac' /* sense gluten: blat, l'ordi, sègol, civada, blat kamut, espelta */,
    islamic = 'islàmica',
    /* islàmica. A més d'abstemia: NO: porc ni senglar, sang, rèptils, depredadors (aus amb garres o mamifers amb ullals),
        insectes, aràcnids, rates i ratolins, cavalls, simis, ases, rucs, anguiles */
    judaisme = 'judaisme', /* sense porc, conill, llebre, esquirol, gos, gat, camell, cavall, estruç, faisà,
        aus rapinyaires o carronyeres... Del mar només peixos amb aletes i escates (exclou mol·luscos, marisc, tauró...) */
        /* COMPTE! A més, no permet barreja de carn i làctics */
}


/* mínima proteïna animal */
/*
    flexitariana_reducetariana = 'flexitariana o reducetariana' ,

*/

export const enum Taxon /* Tàxon */{
    quotidia = 'quotidià',
    faPatxoca = 'fa patxoca',
    festiu = 'festiu',
    sumptuos = 'sumptuós',
    autentic = 'autèntic',
    exotic = 'exòtic',
    alternatiu = 'alternatiu'
}

export const enum CategoriaRecepta {
    tapes = 'tapes',
    pintxos = 'pintxos',
    entrepans = 'entrepans',
    aperitius = 'aperitius',
    amanides = 'amanides',
    verdures = 'verdures',
    llegums = 'llegums',
    sopes_brous = 'sopes i brous',
    cremes_purés = 'cremes i purés',
    salses = 'salses',
    arrossos = 'arrossos',
    fideus = 'fideus',
    pasta_coques = 'pasta i coques',
    peix = 'peix',
    marisc = 'marisc',
    ous_lactics = 'ous i làctics',
    carns = 'carns',
    postres_dolços = 'postres i dolços',
    begudes_combinats = 'begudes i combinats'
}

export const enum Tecnica {
    cru = 'cru',
    confitat_sal_vinagre = 'confitat amb sal i vinagre',
    confitat_sucre = 'confitat amb sucre',
    confitat_oli = 'confitat amb oli',
    fermentat = 'fermentat',
    bullit_cuit = 'bullit o cuit',
    escaldat = 'escaldat',
    escalfat = 'escalfat',
    vapor = 'vapor',
    sofregit = 'sofregit',
    saltejat = 'saltejat',
    ofegat_guisat = 'ofegat o guisat',
    estofat = 'estofat',
    forn = 'forn',
    planxa = 'planxa',
    graella = 'graella',
    rostit = 'rostit',
    fregit = 'fregit',
    microones = 'microones'
}

/* https://blog.scoolinary.com/como-se-clasifican-los-cocteles */
/* https://www.cocteleria.com.mx/blog/cocteleria/tipos-de-cocteles-que-debes-conocer/ */
export const enum TecnicaCocktail {
    Collins,
    Cobblers,
    Coolers,
    Cups,
    Crustas,
    Daisies,
    Eggnog,
    Fizz,
    Grog,
    Flips,
    Juleps,
    Sours,
    Highballs,
    Slings,
    Smash,
    Mules,
    Spritz,
    Pousse_cafe,
    Sangarees,
    Swizzles
}


export const enum TipusCocktail {
    short_drink,
    long_drink,
    hot_short_drink,
    hot_long_drink,
    virgin_short_drink,
    virgin_long_drink,
    virgin_hot_short_drink,
    virgin_hot_long_drink,
}

export const enum unitatTemps {
    seg = 'seg',
    min = 'min',
    h = 'h'
}

export const enum unitatPes {
    g,
    kg,
}

export const enum unitatVolumManual {
    sospir,
    pessic,
    polsim,
    xic,
    mica,
    grapat,
    rajolí,
    raig
}

/*
  sospir: Hi és, però és més o menys invisible.
  pessic: Hi és, però costa de trobar: quantitat que cab si s’ajunten el dit gros i l’índex. 
  polsim: Hi és, i a més a més es veu: pessics que distribuïm per la superfície del plat…com si estigues cobert per un xic de pols
  raig: per a líquids; abocar una mica.
  rajolí: raig petit. líquid que surt en 2 segons d’un setrill d’oli petit, per exemple.
  un xic, una mica: equivalent a pessic, polsim o raig-rajolí. Pot dependre del plat i del gust.

  mesura en tasses i cullerades: omplir sense comprimir.
  rasar una cullerada: utilitzar un ganivet per treure l’excés.
*/

export const enum unitatVolum {
    cc,
    ml,
    tasseta_moca,
    copeta,
    copa_conyac,
    got_licor,
    tasseta,
    tassa_cafè,
    gotet,
    got_vi,
    tassa_te,
    tassa,
    got,
    got_aigua,
    tassa_esmorzar,
    bol,
    litres,
    culler,
    cullerot,
    cutxaró,
    cullerassa,
    cassó,
    cullerada,
    cullaradeta,
    cullaradeta_moca,
}

export const enum origenRecepta {
    Tradicional_de_família,
    Parents_i_amics_propers,
    Coneguts,
    Llibre_Cooch_2000,
    Llibre_1050_receptes,
    Altre_llibre,
    Internet
}

export type unitatQuantitat = unitatVolumManual | unitatVolum | unitatPes | "unitats";
