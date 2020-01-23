import React from "react";
import {Company} from "../../types/devis";

interface Props {
    company?: Company;
}

interface State {
    company?: Company;
}

class CompanyComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            company: props.company,
        }
    }

    render() {
        const { company } = this.state;
            return (
                <div className="container-fluid">
                    <div>{company?.name}</div>
                    <div>{company?.email}</div>
                    <div>{company?.city}</div>
                </div>
            );
        }
}

export default CompanyComponent;