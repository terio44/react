import React from "react";
import {Devis} from "../types/devis";

interface Props {
    devis?: Devis | null;
}

interface State {
    devis?: Devis | null;
}

class FooterComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {...props};
    }

    static getDisplayedValues() {
        return {
            prixTotalHTAvantRemise: 'Prix Total HT avant remise',
            montantRemise: 'Montant Remise',
            prixTotalHT: 'Prix Total HT',
            prixTotalTTC: 'Prix Total TTC',
            prixTotalFreeTTC: 'Prix Total Free TTC',
            prixTotalFournitureHT: 'Prix Total Fourniture HT',
            tauxTVA: 'Taux TVA',
            montantTVA: 'Montant TVA',
            prixTTC: 'Prix TTC'
        }
    }

    render() {
        const { devis } = this.state as any;
        const displayedValues = FooterComponent.getDisplayedValues() as any;
        return (
            <div className="container">
                <div className="row mt-4 justify-content-end">
                   <div className="col-6 list-group">
                   {
                        Object.keys(displayedValues).map((key, index) => {
                            return <div className="row">
                                <span className="col-6 list-group-item">{displayedValues[key]}</span>
                                <span className="col-6 list-group-item">{devis[key]}</span>
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