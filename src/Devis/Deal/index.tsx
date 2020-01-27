import React from "react";
import {Deal} from "../../types/devis";

export interface Props {
    deal?: Deal;
}

class DealComponent extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = {...props};
    }

    render() {
        const { deal } = this.props;
        return (
            <div className="container-fluid">
                <div className="row justify-content-end">
                    <div className="col-6">
                        <div>{deal?.customerName}</div>
                        <div>
                            {deal?.billingAddress.address},
                            {deal?.billingAddress.city},
                            {deal?.billingAddress.postalCode}
                        </div>
                        <div>{deal?.customerEmail}</div>
                    </div>
                </div>
                <div className="row mt-4 justify-content-start">
                    <div className="col-6">
                        {deal?.chantierAddress.address},
                        {deal?.chantierAddress.city},
                        {deal?.chantierAddress.postalCode}
                    </div>
                </div>
            </div>
        );
    }
}

export default DealComponent;
