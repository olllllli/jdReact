import { FunctionComponent, useState } from "react";
import { MCOption } from "./MCOption";
import { MCSelect } from "./MCSelect";
import MCStatView from "./MCStatView";

import "styles/components/MCStatContainer.scss";
import trackedStats from "lib/MCStatTracked";

/* The container for MCStatView-s */
const MCStatContainer: FunctionComponent<{}> = () => {
    const [currentStat, setCurrentStat] = useState("playtime");

    // generate the options
    const options: React.ReactNode[] = [];
    trackedStats.forEach((data, key) => {
        options.push(
            <MCOption value={key} onSelect={setCurrentStat} key={key}>{data.display}</MCOption>
        );
    });

    // generate the view based on the current stat
    const statInfo = trackedStats.get(currentStat)!;
    let view;
    if (statInfo.type === "simple") {
        // a simple stat
        view = <MCStatView type="simple" statName={statInfo.stat} />;
    } else {
        view = <MCStatView type="composite" statNames={statInfo.stats} formatter={statInfo.formatter} />;
    }

    return (
        <div className="MCStatContainer">
            <div className="header">
                <span>
                    Player
                </span>
                <div>
                    <MCSelect currentValue={currentStat}>
                        {options}
                    </MCSelect>
                </div>
            </div>
            <div className="view">
                {view}
            </div>
        </div>
    );
};

export default MCStatContainer;