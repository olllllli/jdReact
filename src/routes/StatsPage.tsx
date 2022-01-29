import MCToast from "components/MCToast";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import "styles/routes/common.scss";
import "styles/gui.scss";
import written_book from "img/resourcepacks/vanilla/assets/minecraft/textures/item/written_book.png";
import MCStat from "components/MCStat";

// DEBUG
const me = { "username": "_PC", "skin": "http://textures.minecraft.net/texture/cc69b53431dfaa7f60e65dd844f76273731d4074f2dc53e08cd42e7c74fa7392", "offline": false, "advancementCount": 78 };

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
                    <MCStat player={me} displayedValue={100} />
                </div>
            </main>
        </>
    );
};

export default StatsPage;