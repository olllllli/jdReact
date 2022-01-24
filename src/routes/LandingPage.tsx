import MCToast from "components/MCToast";
import { FunctionComponent } from "react";

import "styles/routes/LandingPage.scss";

import knowledge_book from "img/resourcepacks/vanilla/assets/minecraft/textures/item/knowledge_book.png";
import totem from "img/resourcepacks/vanilla/assets/minecraft/textures/item/totem_of_undying.png";
import written_book from "img/resourcepacks/vanilla/assets/minecraft/textures/item/written_book.png";


const LandingPage: FunctionComponent<{}> = () => {
    return (
        <>
            <header>
                <h1>JD Craft</h1>
            </header>
            <main>
                <nav>
                    <MCToast type="link" to="advancements">
                        <img src={knowledge_book} alt="Knowledge Book Icon" /><h2>Advancements</h2>
                    </MCToast>
                    <MCToast type="link" to="players">
                        <img src={totem} alt="Totem Icon" /><h2>Players</h2>
                    </MCToast>
                    <MCToast type="link" to="stats">
                        <img src={written_book} alt="Written Book Icon" /><h2>Statistics</h2>
                    </MCToast>
                </nav>
            </main>
        </>
    );
}

export default LandingPage;