import React from "react";
import {Devis} from "../types/devis";

interface Props {
    devis: Devis;
}

interface State {
    totalValues: {[K: string]: number},
    //tvaValues: {[K: string]: number}[]
}

type DisplayedValues = { [K: string]: string };

class FooterComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            totalValues: {
                prixTotalHTAvantRemise: props.devis.prixTotalHTAvantRemise,
                montantRemise: props.devis.montantRemise,
                prixTotalHT: props.devis.prixTotalHT,
                prixTotalTTC: props.devis.prixTotalTTC,
                prixTotalFreeTTC: props.devis.prixTotalFreeTTC,
                prixTotalFournitureHT: props.devis.prixTotalFournitureHT
            }//,
            //tvaValues: props.devis.montantsTVA.map(value => {taux: value.taux})
        };
    }

    static getDisplayedValues() {
        return {
            prixTotalHTAvantRemise: 'Prix Total HT avant remise',
            montantRemise: 'Montant Remise',
            prixTotalHT: 'Prix Total HT',
            prixTotalTTC: 'Prix Total TTC',
            prixTotalFreeTTC: 'Prix Total Free TTC',
            prixTotalFournitureHT: 'Prix Total Fourniture HT'
        } as DisplayedValues;
    }

    static getTVAValues() {
        return {
            taux: 'Taux TVA',
            base: 'Base TVA',
            montant: 'Montant TVA'
        } as DisplayedValues;
    }

    render() {
        const { totalValues} = this.state;
        const displayedValues = FooterComponent.getDisplayedValues();
        const displayedTVAValues = FooterComponent.getTVAValues();
        return (
            <div className="container">
                <div className="row mt-4 justify-content-end">
                   <div className="col-6 list-group">
                   {
                        Object.keys(displayedValues).map((key, index) => {
                            return <div key={key} className="row">
                                <span className="col-6 list-group-item">{displayedValues[key]}</span>
                                <span className="col-6 list-group-item">{totalValues[key]}</span>
                            </div>
                        })
                   }
                   </div>
                </div>
                {/*<div className="row mt-4 justify-content-end">
                    {tvaValues.map((tva, index) => {
                        return <div key={index} className="col-6 list-group">
                            {
                                Object.keys(displayedTVAValues).map((key, index) => {
                                    return <div key={key} className="row">
                                        <span className="col-6 list-group-item">{displayedTVAValues[key]}</span>
                                        <span className="col-6 list-group-item">{tva[key]}</span>
                                    </div>
                                })
                            }
                        </div>
                    })}
                </div>*/}
            </div>
        );
    }
}

export default FooterComponent;