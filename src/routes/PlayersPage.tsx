import MCToast from "components/MCToast";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import "styles/routes/common.scss";
import "styles/gui.scss";
import totem from "img/resourcepacks/vanilla/assets/minecraft/textures/item/totem_of_undying.png";

const PlayersPage: FunctionComponent<{}> = () => {
    return (
        <>
            <header className="SubpageHeader">
                <Link to="/" className="MCBack" />
                <MCToast>
                    <img src={totem} alt="Totem Icon" />
                    <h2>Players</h2>
                </MCToast>
            </header>
            <main></main>
        </>
    );
};

export default PlayersPage;
