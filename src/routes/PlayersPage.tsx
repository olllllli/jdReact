import MCToast from "components/MCToast";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import "styles/routes/common.scss";
import "styles/gui.scss";
import totem from "img/gui/totem_of_undying.png";
import MCItem from "components/MCItem";

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
            <main>
                <style>
                    {".MCItem { height: 64px; width: 64px } "}
                </style>
                <div>
                    <MCItem type="item" name="iron_pickaxe" />
                    <MCItem type="block" name="beacon" />

                </div>
            </main>
        </>
    );
};

export default PlayersPage;
