import { FunctionComponent, useState } from "react";
import MCAdvView from "./MCAdvView";
import { MCSelect, MCOption } from "./MCSelect";

import "styles/components/MCAdvContainer.scss";

/* The container gui for an advancement view, contains the selects and the view */
// TODO: Possibly figure out how to only rerender the view
const MCAdvContainer: FunctionComponent<{}> = () => {
    const [category, setCategory] = useState<AdvCategory>("story");


    console.log("rendered advContainer");
    return (
        <div className="MCAdvContainer">
            <div className="header">
                <div>
                    <MCSelect>
                        <MCOption value="9f2c6739-1f8f-4118-ab3a-2b102ee78311" display="_PC" />
                        <MCOption value="e059c39e-cd8c-4a09-bf3f-7142367f7cfb" display="5fps" />
                    </MCSelect>
                </div>
                <div>
                    <MCSelect onChange={setCategory}>
                        <MCOption value="story" display="Story" selected={true} />
                        <MCOption value="nether" display="Nether" />
                        <MCOption value="end" display="End" />
                        <MCOption value="adventure" display="Adventure" />
                        <MCOption value="husbandry" display="Husbandry" />
                    </MCSelect>
                </div>
            </div>
            <div className="view">
                <MCAdvView category={category} />
            </div>
        </div>
    );
};

export default MCAdvContainer;