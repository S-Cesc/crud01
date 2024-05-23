export enum serviceStatusResult {
    ok = "Tot ha anat bé; el servei ha executat l'operació demanada.",
    permissionError = "Permís denegat.",
    missingPrimaryKey = "L'element no té clau, o algun camp de la clau no està definit.",
    attemptToDuplicateItem = "L'element ja existeix: intent d'introduir un duplicat.",
    referenceConstraintError = "L'element està referenciat per un altre.",
    modelConstraintError = "No s'ha acceptat l'element; algun atribut és incorrecte.",
    unexpectedError = "Error imprevist en el servei.",
    itemNotFound = "No s'ha trobat l'element."
}

export function uuidv4Random() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}