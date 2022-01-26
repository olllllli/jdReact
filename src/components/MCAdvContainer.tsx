import { FunctionComponent } from "react";
import MCAdvView from "./MCAdvView";
import MCSelect from "./MCSelect";

import "styles/components/MCAdvContainer.scss";

/* The container gui for an advancement view, contains the selects and the view */
const MCAdvContainer: FunctionComponent<{}> = () => {
    return (
        <div className="MCAdvContainer">
            <div className="header">
                <div>
                    <MCSelect>
                        <option value="9f2c6739-1f8f-4118-ab3a-2b102ee78311">_PC</option>
                        <option value="e059c39e-cd8c-4a09-bf3f-7142367f7cfb">5fps</option>
                    </MCSelect>
                </div>
                <div>
                    <MCSelect>
                        <option value="story">Story</option>
                        <option value="nether">Nether</option>
                        <option value="end">End</option>
                        <option value="adventure">Adventure</option>
                        <option value="husbandry">Husbandry</option>
                    </MCSelect>
                </div>
            </div>
            <div className="view">
                <MCAdvView category="story" />
            </div>
        </div>
    );
};

export default MCAdvContainer;