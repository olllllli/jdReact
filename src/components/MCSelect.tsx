import React, { useEffect, useRef } from "react";
import { FunctionComponent, useState } from "react";

import "styles/components/MCSelect.scss";

/* The Select component, should only be given MCOption as children */
interface MCSelectProps {
    currentValue?: string;
}

export const MCSelect: FunctionComponent<MCSelectProps> = (props) => {
    // the click and hover stat
    const [opened, setOpened] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    /* Handling clicks outside of the component (code must go here) */
    // https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
    useEffect(() => {
        function clickedOutside(event: MouseEvent) {
            // opened && ref is on a component && click is not contained within
            if (opened && ref.current && !ref.current.contains(event.target as Node)) {
                setOpened(!opened);
            }
        }

        // add the event listener if its currently opened
        if (opened) {
            document.addEventListener("mousedown", clickedOutside);
        }

        // remove the event listener on cleanup
        return () => {
            document.removeEventListener("mousedown", clickedOutside);
        };
    }, [opened, ref]);

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
        <div ref={ref}
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