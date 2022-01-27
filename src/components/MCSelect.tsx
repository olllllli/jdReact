import { FunctionComponent, useState } from "react";
import * as React from "react";

import "styles/components/MCSelect.scss";

/* A option component for the MCSelect component, doesn't render anything */
// TODO: There might be a better interface for this
interface MCOptionProps {
    value: string;
    display: string;
    selected?: boolean;
}

export const MCOption: FunctionComponent<MCOptionProps> = (props) => {
    // For now returns an option
    // return (
    //     <option value={props.value}>{props.display}</option>
    // );
    return (
        <div className="MCOption" id={props.value}>
            {props.display}
        </div>
    );
};

/* The Select component, should only be given MCOption as children */
interface MCSelectProps {
    onChange?: React.Dispatch<React.SetStateAction<any>>;
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
    let selectedValue: MCOptionProps = { display: "", value: "" };
    // const options = [];
    if (!children || children.length === 0) {
        // there were no children
        isDisabled = true;
    } else {
        for (const child of children) {
            // check if its selected (will only remember the last one)
            if (child.selected) {
                selectedValue = child;
            }
            // push it to the list of options
            // options.push(<div id={child.value}>{child.display}</div>);
        }
    }

    // store the current value on the state
    const [currentValue, setCurrentValue] = useState<MCOptionProps>(selectedValue);

    // on change, setValue and call the given onChange function with the value
    return (
        <div
            className={"MCSelect " + (opened ? "open" : "closed")}
            onClick={(e) => {
                setOpened(!opened);
            }}
        >
            <div className="selectHeader">{currentValue.display}</div>
            <div className="selectBody">{props.children}</div>
        </div>
    );
};

// export const MCSelect: FunctionComponent<MCSelectProps> = (props) => {
//     // process the children, filter out anything that doesnt have the MCOptionProps
//     const children = React.Children.map(props.children, (child) => {
//         if (child && typeof child === "object" && "props" in child && ("value" in child.props && "display" in child.props)) {
//             return child.props as MCOptionProps;
//         }
//     });

//     // check the children, disable if no children
//     let isDisabled = false;
//     let blankOption: JSX.Element | undefined = <option disabled value="" style={{ display: "none" }} />;
//     let selectedValue = "";
//     const options = [];
//     if (!children || children.length === 0) {
//         // there were no children
//         isDisabled = true;
//     } else {
//         for (const child of children) {
//             // check if its selected (will only remember the last one)
//             if (child.selected) {
//                 selectedValue = child.value;
//                 blankOption = undefined;
//             }
//             // push it to the list of options
//             options.push(<option value={child.value}>{child.display}</option>);
//         }
//     }

//     // store the current value on the state
//     const [currentValue, setCurrentValue] = useState<string>(selectedValue);

//     // on change, setValue and call the given onChange function with the value
//     return (
//         <select className="MCSelect" disabled={isDisabled} value={currentValue} onChange={(e) => { if (props.onChange) { props.onChange(e.target.value); }; setCurrentValue(e.target.value); }}>
//             {blankOption}
//             {props.children}
//         </select>
//     );
// };
