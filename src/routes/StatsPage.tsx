import MCToast from "components/MCToast";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import "styles/routes/common.scss";
import "styles/gui.scss";
import written_book from "img/resourcepacks/vanilla/assets/minecraft/textures/item/written_book.png";


const StatsPage: FunctionComponent<{}> = () => {
    return (
        <>
            <header className="SubpageHeader">
                <Link to="/" className="MCBack" />
                <MCToast>
                    <img src={written_book} /><h2>Statistics</h2>
                </MCToast>
            </header>
            <main>

            </main>
        </>
    );
}

export default StatsPage;