


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
