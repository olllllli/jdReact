import MCToast from "components/MCToast";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import "styles/routes/common.scss";
import "styles/gui.scss";
import knowledge_book from "img/resourcepacks/vanilla/assets/minecraft/textures/item/knowledge_book.png";
import MCAdvView from "components/MCAdvView";

// TODO: Actually do this
const AdvPage: FunctionComponent<{}> = () => {
    return (
        <>
            <header className="SubpageHeader">
                <Link to="/" className="MCBack" />
                <MCToast>
                    <img src={knowledge_book} alt="Knowledge Book Icon" /><h2>Advancements</h2>
                </MCToast>
            </header>
            <main>
                <MCAdvView category="end" />
            </main>
        </>
    );
};

export default AdvPage;