import { FunctionComponent } from "react";

import "styles/components/MCAdvTooltip.scss";

/* A component representing the tooltip shown when hovering over an Advancement */
interface MCAdvTooltipProps {
    header: string;
    description: string;
    done?: boolean;
    open?: boolean;
    criteria: {
        criterion: string,
        done: timestampBasic | null;
    }[];
}

const MCAdvTooltip: FunctionComponent<MCAdvTooltipProps> = (props) => {
    // generate the criteria list
    let criteriaList = [];
    let latestDate = new Date(0);
    for (const criteriaEntry of props.criteria) {
        if (criteriaEntry.done) {
            const date = new Date(criteriaEntry.done);
            if (date > latestDate) {
                latestDate = date;
            }

            criteriaList.push(
                <li className="done" key={criteriaEntry.criterion}>{criteriaEntry.criterion}</li>
            );
        } else {
            criteriaList.push(
                <li key={criteriaEntry.criterion}>{criteriaEntry.criterion}</li>
            );
        }
    }

    // return the rendering
    return (
        <div className="MCAdvTooltip">
            <div className={"header" + (props.done ? " done" : "")}>
                {props.header}
            </div>
            <div className="description">
                {props.description}
            </div>
            <div className={"criteria"}>
                {
                    props.open ?
                        (
                            <ul>
                                <span>{props.done ? latestDate.toLocaleDateString() : undefined}</span>
                                {criteriaList}
                            </ul>
                        ) :
                        "Click For More..."
                }
            </div>
        </div>
    );
};

export default MCAdvTooltip;