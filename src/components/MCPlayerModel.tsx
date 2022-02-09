import { FunctionComponent } from "react";
import SceneComponent from 'babylonjs-hook';
import { Scene, Color4, ArcRotateCamera, Vector3 } from "@babylonjs/core";
import { modelSteveCurrent, modelSteveLegacy, modelAlex } from "lib/MCPlayerModels";
import offlineSkin from "img/gui/offline_skin.png";
import MCRender from "lib/MCRender";
import getImage from "lib/getImage";
import "styles/components/MCPlayerModel.scss";

/* Component that renders a player model of a player */
interface MCPlayerModelProps {
    uuid: uuid;
    data: playerData;
}

async function onSceneReady(props: MCPlayerModelProps, scene: Scene) {
    // setup the scene and camera
    scene.clearColor = new Color4(0, 0, 0, 0);
    // calcuate the values
    const radius = 48;
    const horizontalRotation = Math.PI / 4;
    const verticalRotation = Math.PI / 3; // the wiki to standardise 2:1
    // const verticalRotation = Math.atan(Math.sqrt(2)); // the real angle
    const engine = scene.getEngine();

    // create camera
    const camera = new ArcRotateCamera("mainCamera", horizontalRotation, verticalRotation, radius, new Vector3(8, 16, 8), scene);
    // engine.setHardwareScalingLevel(1 / window.devicePixelRatio);
    engine.setHardwareScalingLevel(0.1);
    camera.attachControl();

    // get the skins image, determine what model to use
    // cors :c thankyou https://crafatar.com
    const skin = await getImage(props.data.offline ? offlineSkin : "https://crafatar.com/skins/" + props.uuid);
    let model: PlayerModelType;
    if (skin.height === 32) {
        console.log("Model: steve/legacy");
        model = modelSteveLegacy;
    } else {
        // check pixel to right of left arm texture // TODO: this isnt really thorough
        const canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(skin, 47, 63, 1, 1, 0, 0, 1, 1);
        const pixel = ctx.getImageData(0, 0, 1, 1).data;

        // if nothing there, then its alex model
        if (pixel.filter(v => (v !== 0)).length === 0) {
            console.log("Model: alex");
            model = modelAlex;
        } else {
            console.log("Model: steve/current");
            model = modelSteveCurrent;
        }
    }


    // render the skin
    let elementNum = 0;
    for (const element of model.elements) {
        await MCRender.Model.fromElementData(scene, String(elementNum), element, { skin });
    }

    // disable the engine
    // engine.stopRenderLoop();
    // engine.dispose();
}

const MCPlayerModel: FunctionComponent<MCPlayerModelProps> = (props) => {
    return (
        <div className="MCPlayerModel">
            <SceneComponent onSceneReady={scene => onSceneReady(props, scene)} antialias={false} />
        </div>
    );
};

export default MCPlayerModel;