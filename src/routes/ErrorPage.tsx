import MCToast from "components/MCToast";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import "styles/routes/common.scss";
import "styles/gui.scss";
import barrier from "img/gui/barrier.png";

const ErrorPage: FunctionComponent<{}> = () => {
    return (
        <>
            <header className="SubpageHeader">
                <Link to="/" className="MCBack" />
                <MCToast>
                    <img src={barrier} alt="Barrier Icon" />
                    <h2>Error 404: Nothing Here ._.</h2>
                </MCToast>
            </header>
            <main>
            </main>
        </>
    );
};

export default ErrorPage;
