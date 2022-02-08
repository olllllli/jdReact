import MCToast from "components/MCToast";
import { Link } from "react-router-dom";
import totem from "img/gui/totem_of_undying.png";
import { FunctionComponent } from "react";


const PlayerSearchPage: FunctionComponent<{}> = () => {
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

            </main>
        </>
    );
};

export default PlayerSearchPage;

