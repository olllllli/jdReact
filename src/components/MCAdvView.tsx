import { cache } from "index";
import { PIXELSIZE } from "lib/globalConstants";
import { advancementLayouts, layoutSizes } from "lib/MCAdvLayouts";
import { FunctionComponent, useEffect, useState } from "react";

import "styles/components/MCAdvView.scss";
import MCAdvancement from "./MCAdvancement";

/* Converts the positions of two advancements, to a line between them */
// TODO: Optimise this
type pos = { row: number; col: number; };
function posToLine(parentPos: pos, childPos: pos, color: "white" | "black", key?: string) {
    // calculate the middle coords of each
    // NOTE: Assumes gridsquare are 12*pixelSize and gridgap is 2*pixelSize
    const parentX = (parentPos.col - 1) * 14 * PIXELSIZE + 13 * PIXELSIZE;
    const parentY = (parentPos.row - 1) * 14 * PIXELSIZE + 13 * PIXELSIZE;
    const childX = (childPos.col - 1) * 14 * PIXELSIZE + 13 * PIXELSIZE;
    const childY = (childPos.row - 1) * 14 * PIXELSIZE + 13 * PIXELSIZE;

    if (parentPos.row === childPos.row) {
        // on the same row, just generate a normal line
        return <line id={color} x1={parentX} y1={parentY} x2={childX} y2={childY} key={key} />;
    } else {
        // generate a polyline, starting at parent and ending at child
        const midX = Math.floor((parentX + childX) / 2);
        return <polyline id={color} points={`${parentX},${parentY} ${midX},${parentY} ${midX},${childY} ${childX},${childY}`} key={key} />;
    }
}

interface MCAdvViewProps {
    category: AdvCategory; // The category of the advancements
    user?: uuid; // The uuid of the user
}

/* A display of advancements, organises and displays category of advancements */
const MCAdvView: FunctionComponent<MCAdvViewProps> = (props) => {
    /* Getting the data if the user was given */
    /* The component will render first without the user data, and once data has been retrieved, state will change */
    // NOTE: Could swap to a blocking model, or move this to the container instead to allow for select blocking
    const [userData, setUserData] = useState<advancementsData>({ DataVersion: -1 }); // TODO: I also think this is probs bad
    useEffect(() => {
        async function getUserData(user: uuid) {
            const data = await cache.getAdvancements(user);
            setUserData(data); // TODO: I think this is really bad because of unknown return type when fail since unimplementations
        }

        // call the getUserData function now if a user was given
        if (props.user) {
            getUserData(props.user);
        }
    }, [props.user]);

    /* Rendering the component */
    // Get all the children components and generate the svg
    const advancements = [];
    const blackLines = [];
    const whiteLines = [];
    for (const advName in advancementLayouts[props.category]) {
        // get its position and work out the grid area it takes up
        const pos = advancementLayouts[props.category][advName];
        const gridArea = `${pos.row} / ${pos.col} / ${pos.row + 2} / ${pos.col + 2}`;

        // check whether the advancement is completed
        const advNamespace: advancementNamespace = `minecraft:${props.category}/${advName}`;
        const advDone = userData[advNamespace] ? userData[advNamespace].done : false;
        const advCriteriaData = userData[advNamespace] ? userData[advNamespace].criteria : {};

        // add the advancement
        advancements.push(
            <MCAdvancement category={props.category} name={advName} style={{ gridArea: gridArea }} key={advNamespace} criteriaData={advCriteriaData} done={advDone} />
        );

        // generate the lines from the advancement to its children
        const children = pos.children;
        for (const childName of children) {
            const childPos = advancementLayouts[props.category][childName];
            const blackLine = posToLine(pos, childPos, "black", `blackLine:${childName}`);
            const whiteLine = posToLine(pos, childPos, "white", `whiteLine:${childName}`);

            // push them to the array
            blackLines.push(blackLine);
            whiteLines.push(whiteLine);
        }
    }

    // calculate the svg height and width
    // NOTE: Assumes gridsquare are 12*pixelSize and gridgap is 2*pixelSize
    const svgHeight = 12 * PIXELSIZE * layoutSizes[props.category].rows + 2 * PIXELSIZE * (layoutSizes[props.category].rows - 1);
    const svgWidth = 12 * PIXELSIZE * layoutSizes[props.category].cols + 2 * PIXELSIZE * (layoutSizes[props.category].cols - 1);

    // return the resultant element
    return (
        <div className={"MCAdvView " + props.category}>
            <div>
                <div className="lines">
                    <svg width={svgWidth} height={svgHeight}>
                        {blackLines}
                        {whiteLines}
                    </svg>
                </div>
                {advancements}
            </div>
        </div>
    );
};

export default MCAdvView;
