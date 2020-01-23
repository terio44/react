import React from "react";
import {Lot} from "../../types/devis";

interface Props {
    lot?: Lot;
}

interface State {
    lot?: Lot;
}

class LotComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {...props};
    }

    static getDisplayedColumns() {
        return {
            designation: 'Désignation',
            description: 'Description',
            prixUnitaireHT: 'Prix unitaire HT',
            quantite: 'Quantité',
            unite: 'Unité',
            prixHT: 'Prix HT',
            tauxTVA: 'Taux TVA',
            montantTVA: 'Montant TVA',
            prixTTC: 'Prix TTC'
        }
    }

    render() {
        const { lot } = this.state;
        const displayedColumns = LotComponent.getDisplayedColumns();
        return (
            <div className="container-fluid">
                <div className="row mt-4">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                {
                                    Object.values(displayedColumns).map((value, index) => {
                                        return <th key={index}>{value}</th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                        {lot?.lignes.map((item, key) =>
                            <tr key={key}>
                                {
                                    Object.keys(displayedColumns).map((value, index) => {
                                        return <td key={index}>{(item as any)[value]}</td>
                                    })
                                }
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default LotComponent;