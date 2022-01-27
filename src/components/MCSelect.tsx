import { FunctionComponent, useState } from "react";
import * as React from "react";

import "styles/components/MCSelect.scss";
import { MCOptionProps } from "./MCOption";

/* The Select component, should only be given MCOption as children */
interface MCSelectProps {
    onChange?: React.Dispatch<React.SetStateAction<any>>;
    currentValue?: string;
}

export const MCSelect: FunctionComponent<MCSelectProps> = (props) => {
    // the click and hover stat
    const [opened, setOpened] = useState(false);

    // process the children, filter out anything that doesnt have the MCOptionProps
    const children = React.Children.map(props.children, (child) => {
        if (child && typeof child === "object" && "props" in child && "value" in child.props && "display" in child.props) {
            return child.props as MCOptionProps;
        }
    });

    // check the children, disable if no children
    let isDisabled = false;
    if (!children || children.length === 0) {
        // there were no children
        isDisabled = true;
    }

    // on change, setValue and call the given onChange function with the value
    return (
        <div
            className={"MCSelect " + (opened ? "open" : "closed")}
            onClick={() =>
                !isDisabled && setOpened(!opened)
            }
        >
            <div className="selectHeader">{props.currentValue}</div>
            <div className="selectBody">{props.children}</div>
        </div>
    );
};