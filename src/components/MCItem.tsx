import { FunctionComponent } from "react";

import "styles/components/MCItem.scss";

interface MCItemProps {
    type: "item" | "block",
    name: string,
    enchanted?: boolean
}

const MCItem: FunctionComponent<MCItemProps> = (props) => {
    return (
        <div className="MCItem">
            <div className="MCItemMissing">

            </div>
        </div>
    );
}

export default MCItem;