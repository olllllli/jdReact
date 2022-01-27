import { FunctionComponent } from "react";
import * as React from "react";

import "styles/components/MCSelect.scss";


/* A option component for the MCSelect component, doesn't render anything */
// TODO: There might be a better interface for this
export interface MCOptionProps {
    value: string;
    selected?: boolean;
    onSelect: (value: string) => void;
}

export const MCOption: FunctionComponent<MCOptionProps> = (props) => {
    // For now returns an option
    return (
        <div onClick={() => props.onSelect(props.value)} className="MCOption" id={props.value}>
            {props.children}
        </div>
    );
};
