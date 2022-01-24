import MCToast from "components/MCToast";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import "styles/routes/common.scss";
import "styles/gui.scss";
import knowledge_book from "img/resourcepacks/vanilla/assets/minecraft/textures/item/knowledge_book.png";


const AdvPage: FunctionComponent<{}> = () => {
    return (
        <>
            <header className="SubpageHeader">
                <Link to="/" className="MCBack" />
                <MCToast>
                    <img src={knowledge_book} /><h2>Advancements</h2>
                </MCToast>
            </header>
            <main>

            </main>
        </>
    );
}

export default AdvPage;