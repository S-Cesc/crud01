import { Nomidioma } from "./enums";

export type NomIdiomes = Partial<{ [id in Nomidioma] : string; }>;
