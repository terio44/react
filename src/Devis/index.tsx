import React from "react";
import {travauxLib} from "../constants/api";
import {Devis, Ligne, Lot} from "../types/devis";
import HeaderComponent from "./header";
import LotComponent from "./Lot";
import FooterComponent from "./footer";
import {defaultPiece} from "../constants/prestation";

interface Props {
    devis?: Devis;
}

interface State {
    error: string | null;
    isLoaded: boolean;
    currentDevis?: Devis;
    vuePiece: boolean;
}

class DevisComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            currentDevis: props.devis,
            isLoaded: false,
            error: null,
            vuePiece: false
        };
        this.switchVue = this.switchVue.bind(this);
        this.fromMetiersToPieces = this.fromMetiersToPieces.bind(this);
        this.getActiveVueClassName.bind(this);
    }

    componentDidMount() {
        const devisUrl = 'devis-pro/JKusHl8Ba8MABIjdCtLZOe2lxxnUfX';
        fetch(`${travauxLib}/${devisUrl}`)
            .then(res => res.json())
            .then(
                devis => this.setState({
                    currentDevis: devis,
                    isLoaded: true
                }),
                error => this.setState({
                    currentDevis: undefined,
                    error,
                    isLoaded: true
                })
            )
    }

    getActiveVueClassName(isVuePiece: boolean) {
        const isCurrentVuePiece = this.state.vuePiece;
        return isCurrentVuePiece === isVuePiece ? 'active' : '';
    }

    switchVue (vuePiece: boolean) {
        this.setState({
            vuePiece: vuePiece
        });
    };

    getLots() {
        const lots = this.state.currentDevis?.lots ? this.state.currentDevis.lots : [];
        return this.state.vuePiece ? this.fromMetiersToPieces(lots) : lots;
    }

    fromMetiersToPieces(lots: Lot[]): Lot[] {
        let lotsMetiers: Lot[] = [new Lot(defaultPiece)];
        if(this.state.currentDevis) {
            //TODO -> Insert lot during iteration on lignes and not before
            const {locations} = this.state.currentDevis;
            locations.forEach(loc => lotsMetiers = [...lotsMetiers, new Lot(loc.label, loc.uuid)]);
            //TODO -> Get rid of foreach
            lots.flatMap(l => l.lignes).forEach(ligne => {
                const ligneLocations = ligne.locationsDetails?.locations;
                if(ligneLocations && ligneLocations.length > 0){
                    ligneLocations.forEach(loc => {
                        const index = lotsMetiers.findIndex(lot => lot.uuid === loc.uuid && loc.quantite > 0);
                        if(index > -1) {
                            const newLigne = new Ligne(ligne, loc.uuid);
                            lotsMetiers[index].lignes = [...lotsMetiers[index].lignes, newLigne];
                            lotsMetiers[index].prixTotalTTC += newLigne.prixTTC;
                            lotsMetiers[index].prixTotalHT += newLigne.prixHT;
                        }
                    });
                } else {
                    const newLigne = new Ligne(ligne);
                    lotsMetiers[0].lignes = [...lotsMetiers[0].lignes, newLigne];
                    lotsMetiers[0].prixTotalTTC += newLigne.prixTTC;
                    lotsMetiers[0].prixTotalHT += newLigne.prixHT;
                }
            });
        }
        return lotsMetiers;
    }

    render() {
        const { error, isLoaded, currentDevis } = this.state;
        if(error) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erreur : {error}
                </div>
            );
        } else if (!isLoaded) {
            return(
                <div className="spinner-border" role="status">
                    <span className="sr-only">Chargement...</span>
                </div>
            );
        } else {
            if(currentDevis) {
                return (
                    <div className="container">
                        <HeaderComponent
                            deal={currentDevis.deal}
                            company={currentDevis.company}
                            title={currentDevis.title}>
                        </HeaderComponent>
                        <div className="btn-group btn-group-toggle" data-toggle="buttons">
                            <label className={'btn btn-secondary ' + this.getActiveVueClassName(false)}>
                                <input
                                    type="radio" name="options" autoComplete="off"
                                    checked={!this.state.vuePiece}
                                    onChange={() => this.switchVue(false)}
                                /> Par lot métier
                            </label>
                            <label className={'btn btn-secondary ' + this.getActiveVueClassName(true)}>
                                <input
                                    onChange={() => this.switchVue(true)} type="radio" name="options" autoComplete="off"
                                /> Par pièce
                            </label>
                        </div>
                        {this.getLots().map((lot, key) => {
                            return <LotComponent key={key} lot={lot}></LotComponent>
                        })};
                        <FooterComponent devis={currentDevis}></FooterComponent>
                    </div>
                );
            }
        }
    }
}

export default DevisComponent;
