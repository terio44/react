export interface Devis {
    deal: Deal;
    company: Company;
    title: string;
    lots: Lot[];
    prixTotalHTAvantRemise: number;
    remise: {typeRemise: string};
    montantRemise: number;
    prixTotalHT: number;
    prixTotalTTC: number;
    prixTotalFreeTTC: number;
    prixTotalFournitureHT: number;
    montantsTVA: MontantTVA[];
    attachments: any[];
    date: string;
    dureeValidite: {quantity: number, unit: string};
    modalitesPaiement: ModalitePaiement[];
    hasSignedDevisPdf: boolean;
    signe: boolean;
    isTS: boolean;
    isFinal: boolean;
    locations: Location[];
    showTotalFourniture: boolean;
}

export interface Location {
    uuid: string;
    label: string;
    surface: string;
}

export class Lot {
    label: string;
    lignes: Ligne[];
    prixTotalHT: number;
    prixTotalTTC: number;
    uuid?: string;

    constructor(label: string, uuid?: string, ) {
        this.uuid = uuid ? uuid : undefined;
        this.label = label;
        this.lignes = [];
        this.prixTotalHT = 0;
        this.prixTotalTTC = 0;
    }
}

export class Ligne {
    designation: string;
    description: string;
    prixUnitaireHT: number;
    prixPublicFournitureHT: number;
    quantite: number;
    unite: string;
    prixHT: number;
    tauxTVA: number;
    montantTVA: number;
    prixTTC: number;
    locationsDetails?: {
        locations: {
            quantite: number,
            uuid: string
        }[];
        additionalQuantity: number;
        quantityIsByLocation: boolean;
    };

    constructor(ligne: Ligne, piece?: string) {
        this.designation = ligne.designation;
        this.description = ligne.description;
        this.prixUnitaireHT = ligne.prixUnitaireHT;
        this.prixPublicFournitureHT = ligne.prixPublicFournitureHT;
        this.unite = ligne.unite;
        this.tauxTVA = ligne.tauxTVA;
        this.locationsDetails = undefined;
        const location = ligne.locationsDetails?.locations.find(l => l.uuid === piece);
        if(piece && location) {
            this.quantite = location.quantite;
            this.prixHT = ligne.prixHT/location.quantite;
            this.montantTVA = ligne.montantTVA/location.quantite;
            this.prixTTC = ligne.prixTTC/location.quantite;
        } else {
            this.quantite = ligne.quantite;
            this.prixHT = ligne.prixHT;
            this.montantTVA = ligne.montantTVA;
            this.prixTTC = ligne.prixTTC;
        }
    }
}

export interface Deal {
    isTravauxlib: boolean;
    isHemea: boolean;
    customerName: string;
    customerEmail: string;
    billingAddress: Address;
    chantierAddress: Address
}

export interface Company {
    name: string;
    email: string;
    logoUrl: string;
    siret: string;
    formattedSiret: string;
    siren: string;
    numeroTVA: boolean;
    statutEntreprise: StatutEntreprise,
    websites: any,
    address: string;
    postalCode: string;
    city: string;
    phoneNumber: string;
    capital: number;
    insurances: {"file": string; "label": string;}[],
    corpsEtat: any[],
    isRGE: boolean;
    isQualibat: boolean;
    isEcoArtisan: boolean;
    isKycCompliant: boolean;
    isArchitecte: boolean;
    lemonWayWalletId: number;
    firstNameRepresentantLegal: boolean;
    lastNameRepresentantLegal: boolean;
    isAutoEntrepreneur: boolean;
}

export interface MontantTVA {
    taux: number;
    base: number;
    montant: number;
}

interface ModalitePaiement {
    pourcentage: number;
    label: string;
    montant: number;
}

interface Address {
    address: string;
    postalCode: string;
    city: string;
}

enum StatutEntreprise {
    SAS,
}
