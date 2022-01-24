import { FunctionComponent } from "react";
import MCItem from "components/MCItem";

import "styles/components/MCAdvancement.scss";

type MCAdvancementProps = {
    done?: boolean,
    style?: React.CSSProperties,
} & ({
    category: "custom",
    type: advType,
} | {
    category: advCategory,
    name: string,
});

// TODO: Get this working
// maybe use state on the container and the container marks each as done instead of reloading all on user change.
// ie, parent control completion of children, the child doesnt check itself after initial mounting
const MCAdvancement: FunctionComponent<MCAdvancementProps> = (props) => {
    let classes = "MCAdvancement "
    if (props.done) { classes += " done " }

    let element;
    if (props.category === "custom") {
        // element will just use the child given to it
        element = (
            <div className={classes + props.type} style={props.style} >
                {props.children}
            </div>
        );
    } else {
        // assuming a known advancement
        // TODO: Actually get the data from a schema
        element = (
            <div className={classes + "normal"} style={props.style} >
                <MCItem type="item" name="dummy" />
            </div>
        );
    }

    return element;
}

export default MCAdvancement;