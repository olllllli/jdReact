import { FunctionComponent } from "react";
import SceneComponent from 'babylonjs-hook';
import * as BABYLON from "@babylonjs/core";
import missingTexture from "img/gui/missing_texture.png";

import "styles/components/MCItem.scss";
import { RESOURCEPACK } from "lib/globalConstants";
import MCRender from "lib/MCRender";

interface MCItemProps {
    type: "item" | "block";
    name: string;
    enchanted?: boolean;
}

// TODO: Enchant glint

async function onSceneReady(props: MCItemProps, scene: BABYLON.Scene) {
    // setup the scene and camera
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    MCRender.setupCamera(scene);
    const engine = scene.getEngine();
    // engine.setHardwareScalingLevel(1 / window.devicePixelRatio);
    engine.setHardwareScalingLevel(0.1);

    // get the block model data
    const blockLocation = "block/" + props.name as ResourceLocationType;
    const modelData = await MCRender.getModelData(blockLocation);

    // render the block, only if it was actually gotten
    if (modelData) {
        await MCRender.Model.fromModelData(scene, modelData);
    }

    // disable the engine
    engine.stopRenderLoop();
    engine.dispose();
}

const MCItem: FunctionComponent<MCItemProps> = (props) => {
    if (props.type === "item") {
        // an item, just use an img tag
        const path = RESOURCEPACK + "/textures/item/" + props.name + ".png";
        return (
            <div className="MCItem">
                <img src={path} alt={"item/" + props.name + ".png"} />
            </div>
        );
    } else {
        // a block, return the babylonjs scene
        return (
            <div className="MCItem">
                <SceneComponent onSceneReady={scene => onSceneReady(props, scene)} antialias={false} />
            </div>
        );
    }
};

export default MCItem;
