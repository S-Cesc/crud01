/*
	From https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
	by Kent C. Dodds
*/

export enum GUIerrorType {
	FormError = "Form error",
	AuthenticationError = "Authentication error",
}

export type ErrorWithMessage = {
	message: string
}

export function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
	return (
		typeof error === 'object' &&
		error !== null &&
		'message' in error &&
		typeof (error as Record<string, unknown>)['message'] === 'string'
	);
}

export function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
	if (isErrorWithMessage(maybeError)) return maybeError;
	else try {
		return new Error(JSON.stringify(maybeError))
	} catch {
		// fallback in case there's an error stringifying the maybeError
		// like with circular references for example.
		return new Error(String(maybeError));
	}
}

export function getErrorMessage(error: unknown) {
	return toErrorWithMessage(error)['message'];
}


/**
 * Collection of reusable error messages
 */
// TODO (missatges d'error)
export const errorMessages: { [key: string]: string } = {
    email: "Email ha de ser una adreça vàlida d'email (usuari@domini)",
    emailAgain: 'Les adreces de correu han de coincidir.',
    password: "Mínim 8 caràcters, amb una majúscula, una minúscula, un número i un símbol.",
    passwordAgain: 'Les contrasenyes han de coincidir.',
    displayName: 'El nom a de tenir com a mínim tres caracters i ser ÚNIC.',
    formulari: "Error inesperat: Potser no es compleixen les condicions del formulari, o ha hagut un error en el servei.",
    serveiRegistre: "A fallat l'operació de registre. Si us plau, torneu a provar!",
    senseUsari:  "Cap usuari ha iniciat sessió.",
	usuariNoValidat: "Usuari no validat.",
	usuariNoValidatDetall:
	 "Recordi revisar el correu per confirmar-lo, i ser reconegut com a usuari. Llavors, refresqueu la pàgina, i podreu introduir el nom públic.",
	ingredientsServiceError: "Error en el servei d'ingredients.",
};

/**
 * Collection of reusable hint messages
 * -- Note sometimes there could be a reusable errorMessages item;
 * 		then, do not duplicate it (use the error message as hint)
 */
export const hintMessages: { [key: string]: string } = {
	email: "Adreça de correu.",
	emailAgain: "Repetiu l'adreça de correu.",
	password: "Podeu fer servir una frase que tingui majúscules i un número",
	passwordAgain: "Repetiu la contrasenya.",
	displayName: 'Es requereix un nom per permetre a altres usuaris identificar-vos.',
	registerRequired: "Per acedir a aquest lloc web és necessari registrar-se.",
	imageURL: "Podeu definir una icona, per exemple a",
	firstProfile: "Primer perfil dietètic",
	secondProfile: "Segon perfil dietètic",
	thirdProfile: "Tercer perfil dietètic",
	nonPublicStaff: "Informació personal no pública",
	nonPublicStaffDetail: "Aquesta informació només es fa servir quan executeu el programa:\
				l'idioma per a la visualització, i podeu definir perfils dietètics per a les vostres búsquedes.",

};

/**
 * Collection of page names
 */
export const pageNames: { [key: string]: string } = {
	register: "Registar-se en el lloc web",
	login: "Inici de sessió",
	profile: "Dades de l'usuari",
	preview: "Previsualització",
};

/**
 * Collection of reusable form labels
 */
export const formLabels: { [key: string]: string } = {
	email: "Usuari (email)",
	emailAgain: "Repetiu l'usuari",
	password: "Contrasenya",
	passwordAgain: "Repetiu la contrasenya",
	displayName: "Nom públic per a mostrar",
	imageURL: "URL de la imatge",
	firstProfile: "Nom del primer perfil dietètic",
	secondProfile: "Nom del segon perfil dietètic",
	thirdProfile: "Nom del tercer perfil dietètic",
}

export const formActions: { [key: string]: string } = {
	signup: "Registrar-se",
	signin: "Accedir-hi",
	passwordRecover: "Contrasenya oblidada",
	changeEmail: "Canviar l'email",
	send: "Enviar",
}

export interface Idioma {
	value: string;
	viewValue: string;
	img: string;
}

export const idiomes: Idioma[] = [
    {value: 'ca', viewValue: 'català', img: 'assets/ca.svg'},
    {value: 'es', viewValue: 'castellano', img: 'assets/es.svg'},
    {value: 'en', viewValue: 'english', img: 'assets/en.svg'},
    {value: 'fr', viewValue: 'français', img: 'assets/fr.svg'},
  ];
