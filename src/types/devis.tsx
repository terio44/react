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

export interface Lot {
    label: string;
    lignes: Ligne[];
    prixTotalHT: number;
    prixTotalTTC: number;
}

export interface Ligne {
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
    locationsDetails: {
        locations: {quantite: number}[];
        additionalQuantity: number;
        quantityIsByLocation: boolean;
    };

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

interface MontantTVA {
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