import { unitatVolum } from "../model/enums"

/*
{ unitat: unitatVolum.pessic },
{ unitat: unitatVolum.polsim },
{ unitat: unitatVolum.xic },
{ unitat: unitatVolum.mica },
{ unitat: unitatVolum.rajolí },
{ unitat: unitatVolum.raig },
*/

const conversorUnitatsVolum: { unitat: unitatVolum, equiv: number }[] =
[
    { unitat: unitatVolum.cc, equiv: 1 },
    { unitat: unitatVolum.ml, equiv: 1 },
    { unitat: unitatVolum.tasseta_moca, equiv: 50 },
    { unitat: unitatVolum.copeta, equiv: 50 },
    { unitat: unitatVolum.copa_conyac, equiv: 50 },
    { unitat: unitatVolum.got_licor, equiv: 50 },
    { unitat: unitatVolum.culler, equiv: 50 },
    { unitat: unitatVolum.cullerot, equiv: 50 },
    { unitat: unitatVolum.cutxaró, equiv: 50 },
    { unitat: unitatVolum.cullerassa, equiv: 50 },
    { unitat: unitatVolum.tasseta, equiv: 100 },
    { unitat: unitatVolum.tassa_cafè, equiv: 100 },
    { unitat: unitatVolum.gotet, equiv: 100 },
    { unitat: unitatVolum.got_vi, equiv: 100 },
    { unitat: unitatVolum.tassa_te, equiv: 150 },
    { unitat: unitatVolum.cassó, equiv: 150 },
    { unitat: unitatVolum.tassa, equiv: 200 },
    { unitat: unitatVolum.got, equiv: 200 },
    { unitat: unitatVolum.got_aigua, equiv: 200 },
    { unitat: unitatVolum.tassa_esmorzar, equiv: 250 },
    { unitat: unitatVolum.bol, equiv: 250 },
    { unitat: unitatVolum.litres, equiv: 1000 },
    { unitat: unitatVolum.cullerada, equiv: 12.5 },
    { unitat: unitatVolum.tassa_te, equiv: 150 },
    { unitat: unitatVolum.tassa_te, equiv: 150 },
    { unitat: unitatVolum.tassa_te, equiv: 150 },
    { unitat: unitatVolum.tassa_te, equiv: 150 },
    { unitat: unitatVolum.tassa_te, equiv: 150 },
    { unitat: unitatVolum.tassa_te, equiv: 150 },
    { unitat: unitatVolum.cullerot, equiv: 150 },
    { unitat: unitatVolum.cullerada, equiv: 150 },
    { unitat: unitatVolum.cullaradeta, equiv: 150 },
    { unitat: unitatVolum.cullaradeta_moca, equiv: 150 },
]


export function convertirUnitat(q: number, u: unitatVolum, tou: unitatVolum) {
    const selector = conversorUnitatsVolum.map(e => e.unitat);
    const iu = selector.indexOf(u);
    const itou = selector.indexOf(tou);
    return (q * conversorUnitatsVolum[iu].equiv) / conversorUnitatsVolum[itou].equiv;
}
