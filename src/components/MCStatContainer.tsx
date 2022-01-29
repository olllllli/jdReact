import { FunctionComponent, useState } from "react";
import { MCOption } from "./MCOption";
import { MCSelect } from "./MCSelect";
import MCStatView from "./MCStatView";

import "styles/components/MCStatContainer.scss";

/* The container for MCStatView-s */
const MCStatContainer: FunctionComponent<{}> = () => {
    const [currentStat, setCurrentStat] = useState("playtime");

    return (
        <div className="MCStatContainer">
            <div className="header">
                <span>
                    Player
                </span>
                <div>
                    <MCSelect currentValue={currentStat}>
                        <MCOption value="playtime" onSelect={setCurrentStat}>Time Played (hrs)</MCOption>
                        <MCOption value="games_left" onSelect={setCurrentStat}>Times Exitted Server</MCOption>
                    </MCSelect>
                </div>
            </div>
            <div className="view">
                <MCStatView statName="minecraft:custom/minecraft:play_time" />
            </div>
        </div>
    );
};

export default MCStatContainer;