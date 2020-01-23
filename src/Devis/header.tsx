import React from "react";
import {Company, Deal} from "../types/devis";
import CompanyComponent from "./Company";
import DealComponent from "./Deal";

interface Props {
    title?: string;
    deal?: Deal;
    company?: Company;
}

interface State {
    title?: string;
    deal?: Deal;
    company?: Company;
}

class HeaderComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {...props};
    }

    render() {
        const { deal, company, title } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <h1 className="col">DEVIS</h1>
                </div>
                <div className="row">
                    <DealComponent deal={deal}></DealComponent>
                </div>
                <div className="row">
                    <CompanyComponent company={company}></CompanyComponent>
                </div>
                <div className="row mt-4">
                    <h2>{title}</h2>
                </div>
            </div>
        );
    }
}

export default HeaderComponent;