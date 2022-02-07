import { FunctionComponent } from "react";

import "styles/components/MCItem.scss";
import { RESOURCEPACK } from "lib/globalConstants";
import React from "react";

interface MCItemProps {
    name: string;
    enchanted?: boolean;
    custom?: boolean; // whether its using generated image file
}

// TODO: Enchant glint using gif so can add it to the block model aswell
// TODO: Use canvas isntead of img so we can get layers

const MCItem: FunctionComponent<MCItemProps> = (props) => {
    const path = RESOURCEPACK + "/textures/" + (props.custom ? "custom/" : "") + "item/" + props.name + ".png";
    return (
        <div className="MCItem">
            <div className="img" style={{ backgroundImage: `url("${path}")` }}>
                {props.enchanted ? <div className="enchant" style={{ WebkitMaskImage: `url("${path}")` }} /> : undefined}
            </div>
        </div>
    );
};

export default React.memo(MCItem);
