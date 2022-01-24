import { FunctionComponent, ReactElement } from "react";
import { Link } from "react-router-dom";
import "styles/components/MCToast.scss"

type MCToastProps = {
    type: "link",
    to: string
} | {
    type?: "banner"
}

const MCToast: FunctionComponent<MCToastProps> = (props) => {
    // determine whether it was a button or a link
    let parentElement: ReactElement;
    if (props.type === "link") {
        // link type
        parentElement = (
            <Link to={props.to} className="MCToast">
                {props.children}
            </Link>
        )
    } else {
        // banner type
        parentElement = (
            <div className="MCToast">
                {props.children}
            </div>
        )
    }

    return parentElement;
}

export default MCToast;