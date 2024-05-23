


export const StrLimitacioDietaProteica = [
    'sense limitació',
    'flexitariana o reducetariana',
    'hindú no vegetariana',
    'aviram-pisci-vegetariana',
    'quaresma',
    'pisci-vegetariana',
    'lacto_ovo_vegetariana',
    'lacto-vegetariana',
    'vegana (vegetariana estricta)'
] as const;
export type LimitacioDietaProteica = typeof StrLimitacioDietaProteica[number];

/* Aquest enum no serveix pel model: són condicions independents entre elles */
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
