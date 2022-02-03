import MCToast from "components/MCToast";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import "styles/routes/common.scss";
import "styles/gui.scss";
import totem from "img/gui/totem_of_undying.png";
import MCItemNew from "components/MCItemNew";

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
                    {"canvas { width: 400px; height: 400px; margin: 0 auto; } div { width: 100% }"}
                </style>
                <div>
                    <MCItemNew />

                </div>
            </main>
        </>
    );
};

export default PlayersPage;
