import getAdvancementCounts from "lib/getAdvancementCounts";
import getJoinDate from "lib/getJoinDate";
import { FunctionComponent, useState } from "react";

import "styles/components/MCPlayerCardContainer.scss";

function twoDigits(n: number): string {
    return `${n <= 9 ? "0" : ""}${n}`;
}

function datetimeString(d: Date): string {
    const seconds = twoDigits(d.getSeconds());
    const minutes = twoDigits(d.getMinutes());
    const hours = twoDigits(d.getHours());
    const day = twoDigits(d.getDate());
    const month = twoDigits(d.getMonth() + 1);
    const year = twoDigits(d.getFullYear());
    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
}

interface MCPlayerCardContainerProps {
    uuid: uuid;
    advancements: advancementsData;
    player: playerData;
}

/* Container for the player details */
const MCPlayerCardContainer: FunctionComponent<MCPlayerCardContainerProps> = (props) => {
    // the advancement completion status
    const acs = getAdvancementCounts(props.advancements);
    const joinDate = getJoinDate(props.advancements);

    return (
        <div className="MCPlayerCardContainer">
            <div className="player">

            </div>
            <div className="details">
                <div>
                    <h2>{props.player.username}</h2>
                    <span className="uuid">{props.uuid}</span>
                </div>
                <div>
                    <span className="joindate">Joined: {datetimeString(joinDate)}</span>
                </div>
                <div className="advancements">
                    <h3>Advancements Completed:</h3>
                    <span className="story">Story: {acs.story.completed}/{acs.story.total}</span><br />
                    <span className="nether">Nether: {acs.nether.completed}/{acs.nether.total}</span><br />
                    <span className="end">End: {acs.end.completed}/{acs.end.total}</span><br />
                    <span className="adventure">Adventure: {acs.adventure.completed}/{acs.adventure.total}</span><br />
                    <span className="husbandry">Husbandry: {acs.husbandry.completed}/{acs.husbandry.total}</span><br />
                </div>
            </div>
        </div>
    );
};

export default MCPlayerCardContainer;