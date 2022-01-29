import { FunctionComponent } from "react";
import MCToast from "components/MCToast";
import barrier from "img/resourcepacks/vanilla/assets/minecraft/textures/item/barrier.png";

const LoadingPage: FunctionComponent<{}> = () => {
    return (
        <>
            <header className="SubpageHeader">
                <MCToast>
                    <img src={barrier} alt="Barrier Icon" />
                    <h2>Loading...</h2>
                </MCToast>
            </header>
            <main></main>
        </>
    );
};

export default LoadingPage;
