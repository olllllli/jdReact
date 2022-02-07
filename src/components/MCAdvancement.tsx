import { FunctionComponent, useState } from "react";
import MCItem from "components/MCItem";
import advancementDetails from "lib/MCAdvInfo";

import "styles/components/MCAdvancement.scss";
import MCAdvTooltip from "./MCAdvTooltip";
import MCBlock from "./MCBlock";

function cleanCriterion(criterion: string): string {
    return criterion
        .replaceAll("minecraft:", "")
        .replaceAll("textures/entity/cat/", "")
        .replaceAll(".png", "")
        .replaceAll("_", " ");
}

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
            criteriaData?: {
                [criterion: string]: string;
            };
        }
    );

/* A single Advancement */
const MCAdvancement: FunctionComponent<MCAdvancementProps> = (props) => {
    // state for whether tooltip is open
    const [tooltipOpened, setTooltipOpened] = useState(false);

    let classes = "MCAdvancement ";
    if (props.done) {
        classes += " done ";
    }

    // if custom advancement, just return with children
    if (props.category === "custom") {
        return (
            <div className={classes + props.type} style={props.style}>
                {props.children}
            </div>
        );
    }

    // return an empty normal advancement if advancement doesnt exist
    if (!advancementDetails[props.category][props.name]) {
        return <div className={classes + "normal"} style={props.style} />;
    }

    // advancement does exist, create the tooltip's details list, if criteriaData given, use that to fill out the done ones
    const criteria = [];
    for (const criterion of advancementDetails[props.category][props.name].criteria) {
        const entry: { criterion: string; done: timestampBasic | null; } = {
            criterion: cleanCriterion(criterion),
            done: (props.criteriaData && props.criteriaData[criterion]) ? props.criteriaData[criterion] : null
        };
        criteria.push(entry);
    }

    const details = advancementDetails[props.category][props.name];
    const icon = ((details.icon.type === "item") ?
        <MCItem name={details.icon.name} enchanted={details.icon.ench} custom={details.icon.custom} /> :
        <MCBlock name={details.icon.name} custom={details.icon.custom} />
    );
    return (
        <div className={classes + details.type} style={props.style} onClick={() => setTooltipOpened(!tooltipOpened)} onMouseLeave={() => setTooltipOpened(false)}>
            {icon}
            <MCAdvTooltip header={details.title} description={details.desc} criteria={criteria} type={details.type} open={tooltipOpened} done={props.done} />
        </div>
    );
};

export default MCAdvancement;
