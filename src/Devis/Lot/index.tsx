import React from "react";
import {Lot} from "../../types/devis";
import {DisplayedValues} from "../../types/layout";

interface Props {
    lot?: Lot;
}

class LotComponent extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = {...props};
    }

    getDisplayedLigneColumns() {
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

    getDisplayedLot() {
        return {
            prixTotalHT: 'Prix Total Hors Taxes',
            prixTotalTTC: 'Prix Total TTC'
        } as DisplayedValues
    }

    render() {
        const { lot } = this.props;
        const displayedColumns = this.getDisplayedLigneColumns();
        const displayedLot = this.getDisplayedLot();
        return (
            <div className="container-fluid">
                <div className="row">
                    <h4>{lot?.label}</h4>
                </div>
                <div className="row mt-4 table-responsive">
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
                <div className="row justify-content-end">
                    <div className="list-group">
                        {
                            Object.keys(displayedLot).map((key, index) => {
                                return <div key={key} className="row">
                                    <span className="col-6 list-group-item">{displayedLot[key]}</span>
                                    <span className="col-6 list-group-item">{(lot as {[K: string]: any})[key]}</span>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default LotComponent;
