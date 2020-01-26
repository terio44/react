import React from "react";
import {Devis} from "../types/devis";
import {DisplayedValues} from "../types/layout";

interface Props {
    devis: Devis;
}

interface State {
    totalValues: {[K: string]: number},
}

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
            }
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

    render() {
        const { totalValues} = this.state;
        const displayedValues = FooterComponent.getDisplayedValues();
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
            </div>
        );
    }
}

export default FooterComponent;
