import MCToast from "components/MCToast";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import "styles/routes/common.scss";
import "styles/gui.scss";
import knowledge_book from "img/resourcepacks/vanilla/assets/minecraft/textures/item/knowledge_book.png";
import MCAdvancement from "components/MCAdvancement";

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
                {/* 4 x 26 = 104 */}
                <MCAdvancement category="story" name="root" style={{ height: 104, width: 104 }} />
                <MCAdvancement category="custom" type="normal" style={{ height: 104, width: 104 }} />
                <MCAdvancement category="custom" type="normal" done={true} style={{ height: 104, width: 104 }} />
                <MCAdvancement category="custom" type="goal" style={{ height: 104, width: 104 }} />
                <MCAdvancement category="custom" type="goal" done={true} style={{ height: 104, width: 104 }} />
                <MCAdvancement category="custom" type="challenge" style={{ height: 104, width: 104 }} />
                <MCAdvancement category="custom" type="challenge" done={true} style={{ height: 104, width: 104 }} />
            </main>
        </>
    );
}

export default AdvPage;