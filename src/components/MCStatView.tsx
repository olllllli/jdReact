import { FunctionComponent } from "react";

import "styles/components/MCStatView.scss";
import MCStat from "./MCStat";

// DEBUG
const me = { "username": "_PC", "skin": "http://textures.minecraft.net/texture/cc69b53431dfaa7f60e65dd844f76273731d4074f2dc53e08cd42e7c74fa7392", "offline": false, "advancementCount": 78 };

/* A component that displays all users for a specific stat */
type MCStatViewProps = {
    statName: `${statsNamespaces}/${string}`;
};

const MCStatView: FunctionComponent<MCStatViewProps> = (props) => {
    // 


    return (
        <div className="MCStatView">
            <MCStat player={me} displayedValue={100} />
            <MCStat player={me} displayedValue={100} />
            <MCStat player={me} displayedValue={100} />
            <MCStat player={me} displayedValue={100} />
        </div>
    );
};

export default MCStatView;