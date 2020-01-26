import React from "react";
import {Company} from "../../types/devis";

interface Props {
    company?: Company;
}

class CompanyComponent extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = {
            company: props.company,
        }
    }

    render() {
        const { company } = this.props;
            return (
                <div className="container-fluid">
                    <div className="justify-content-end row">
                        <div className="col-6">
                            <div>{company?.name}</div>
                            <div>{company?.email}</div>
                            <div>{company?.city}</div>
                        </div>
                    </div>
                </div>
            );
        }
}

export default CompanyComponent;
