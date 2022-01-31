import { FunctionComponent } from "react";

import "styles/components/MCStat.scss";
import MCHead from "./MCHead";


/* A component to display a statistic, has to be given the data */
interface MCStatProps {
    player: playerData;
    displayedValue: number;
}

// TODO: make the names link to their player page once that is finished
const MCStat: FunctionComponent<MCStatProps> = (props) => {
    return (
        <div className="MCStat">
            <div className="player">
                <MCHead layers="both" data={props.player} />
                <span className="username">{props.player.username}</span>
            </div>
            <span className="value">{props.displayedValue.toFixed(2)}</span>
        </div>
    );
};

export default MCStat;