import { FunctionComponent } from "react";

import "styles/components/MCItem.scss";
import { RESOURCEPACK } from "lib/globalConstants";
import React from "react";

interface MCItemProps {
    name: string;
    enchanted?: boolean;
    custom?: boolean; // whether its using generated image file
}

// TODO: Enchant glint
// TODO: Use canvas isntead of img so we can get layers

const MCItem: FunctionComponent<MCItemProps> = (props) => {
    const path = RESOURCEPACK + "/textures/" + (props.custom ? "custom/" : "") + "item/" + props.name + ".png";
    return (
        <div className="MCItem">
            <img src={path} alt={"item/" + props.name + ".png"} />
        </div>
    );
};

export default React.memo(MCItem);
