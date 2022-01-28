import { FunctionComponent } from "react";

import "styles/components/MCSelect.scss";


/* A option component for the MCSelect component, doesn't render anything */
// TODO: There might be a better interface for this
export interface MCOptionProps {
    value: string;
    selected?: boolean;
    onSelect: (value: string) => void;
}

export const MCOption: FunctionComponent<MCOptionProps> = (props) => {
    // if no children given, just use value as its display
    return (
        <div onClick={() => props.onSelect(props.value)} className={"MCOption" + (props.selected ? " selected" : "")}>
            {props.children ?? props.value}
        </div>
    );
};
