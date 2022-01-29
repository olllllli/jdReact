import MCToast from "components/MCToast";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import "styles/routes/common.scss";
import "styles/gui.scss";
import written_book from "img/resourcepacks/vanilla/assets/minecraft/textures/item/written_book.png";
import MCStatView from "components/MCStatView";

const StatsPage: FunctionComponent<{}> = () => {
    return (
        <>
            <header className="SubpageHeader">
                <Link to="/" className="MCBack" />
                <MCToast>
                    <img src={written_book} alt="Written Book Icon" />
                    <h2>Statistics</h2>
                </MCToast>
            </header>
            <main>
                <div style={{ width: 450 }}>
                    <MCStatView statName="minecraft:broken/minecraft:cobblestone" />
                </div>
            </main>
        </>
    );
};

export default StatsPage;