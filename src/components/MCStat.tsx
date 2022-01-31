import { FunctionComponent } from "react";

import "styles/components/MCStat.scss";


/* A component to display a statistic, has to be given the data */
interface MCStatProps {
    player: playerData;
    displayedValue: number;
}

// TODO: make the names link to their player page once that is finished
// TODO: Use a custom component for the icon instead of img
const MCStat: FunctionComponent<MCStatProps> = (props) => {
    return (
        <div className="MCStat">
            <div className="player">
                <img className="icon" />
                <span className="username">{props.player.username}</span>
            </div>
            <span className="value">{props.displayedValue.toFixed(2)}</span>
        </div>
    );
};

export default MCStat;