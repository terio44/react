import React from "react";
import {travauxLib} from "../constants/api";
import {Devis} from "../types/devis";
import HeaderComponent from "./header";
import LotComponent from "./Lot";
import FooterComponent from "./footer";

interface Props {
    devis?: Devis;
}

interface State {
    error: string | null;
    isLoaded: boolean;
    currentDevis?: Devis;
}

class DevisComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            currentDevis: props.devis,
            isLoaded: false,
            error: null
        }
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
            return (
                <div className="container">
                    <HeaderComponent
                        deal={currentDevis?.deal}
                        company={currentDevis?.company}
                        title={currentDevis?.title}>
                    </HeaderComponent>
                    {this.state.currentDevis?.lots.map((lot, key) => {
                        return <LotComponent key={key} lot={lot}></LotComponent>
                    })};
                    <FooterComponent devis={currentDevis}></FooterComponent>
                </div>
            );
        }

    }
}

export default DevisComponent;