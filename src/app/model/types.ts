import { isNullOrEmpty } from "../util/util";
import { Nomidioma } from "./enums";

export type NomIdiomes = Partial<{ [id in Nomidioma] : string; }>;

export type userProfile = { 
    email: string,
    displayName?: string, 
    photoURL?: string,
    emailVerified: boolean
 };
