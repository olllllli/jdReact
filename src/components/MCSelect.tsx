import React from "react";
import { FunctionComponent, useState } from "react";

import "styles/components/MCSelect.scss";
// TODO: Capture click away

/* The Select component, should only be given MCOption as children */
interface MCSelectProps {
    currentValue?: string;
}

export const MCSelect: FunctionComponent<MCSelectProps> = (props) => {
    // the click and hover stat
    const [opened, setOpened] = useState(false);

    // check the children, disable if no children
    const isDisabled = (!props.children);

    // set the selected tag on the currentValue
    // also map the values to their children for the header display
    // TODO: Review this
    const valueToDisplay = new Map<string, any>();
    const filteredChildren = React.Children.map(props.children, (child) => {
        // is component && .props.value
        if (React.isValidElement(child) && "value" in child.props) {
            // add/set selected prop
            valueToDisplay.set(child.props.value, child.props.children);
            return React.cloneElement(child, { selected: (child.props.value === props.currentValue) });
        } else {
            // throw away since its not a element
            return undefined;
        }
    });

    // on change, setValue and call the given onChange function with the value
    return (
        <div
            className={"MCSelect " + (opened ? "open" : "closed")}
            onClick={() => {
                if (!isDisabled) {
                    setOpened(!opened);
                }
            }
            }
        >
            <div className="selectHeader">{valueToDisplay.get(props.currentValue ?? "")}</div>
            <div className="selectBody">{filteredChildren}</div>
        </div>
    );
};