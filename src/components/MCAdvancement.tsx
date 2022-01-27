import { FunctionComponent } from "react";
import MCItem from "components/MCItem";
import advancementDetails from "lib/MCAdvInfo";

import "styles/components/MCAdvancement.scss";

type MCAdvancementProps = {
    done?: boolean;
    style?: React.CSSProperties;
} & (
    | {
          category: "custom";
          type: AdvType;
      }
    | {
          category: AdvCategory;
          name: string;
      }
);

// TODO: Get this working
// maybe use state on the container and the container marks each as done instead of reloading all on user change.
// ie, parent control completion of children, the child doesnt check itself after initial mounting
/* A single Advancement */
const MCAdvancement: FunctionComponent<MCAdvancementProps> = (props) => {
    let classes = "MCAdvancement ";
    if (props.done) {
        classes += " done ";
    }

    // check if its a custom advancement
    if (props.category === "custom") {
        // element will just use the child given to it, return the advancement
        return (
            <div className={classes + props.type} style={props.style}>
                {props.children}
            </div>
        );
    }

    // check that the advancement exists
    if (!advancementDetails[props.category][props.name]) {
        // advancement doesn't exist, return an empty normal advancement
        return <div className={classes + "normal"} style={props.style} />;
    }

    // advancement does exist
    // TODO: Sort out the tooltip and description
    const details = advancementDetails[props.category][props.name];
    return (
        <div className={classes + details.type} style={props.style}>
            <MCItem type={details.icon.type} name={details.icon.name} enchanted={details.icon.ench} />
        </div>
    );
};

export default MCAdvancement;
