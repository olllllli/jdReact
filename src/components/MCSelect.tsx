import { FunctionComponent } from "react";

interface MCSelectProps {

}

const MCSelect: FunctionComponent<MCSelectProps> = (props) => {
    return (
        <select>
            {props.children}
        </select>
    );
};

export default MCSelect;