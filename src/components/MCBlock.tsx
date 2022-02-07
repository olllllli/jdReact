import { FunctionComponent } from "react";
import SceneComponent from 'babylonjs-hook';
import * as BABYLON from "@babylonjs/core";

import "styles/components/MCBlock.scss";
import MCRender from "lib/MCRender";
import React from "react";

interface MCBlockProps {
    name: string;
    custom?: boolean; // whether its using a custom model file
}

// TODO: Enchant glint
// TODO: Increase the wither skeletonskull size 1.5 without making him look drunk

async function onSceneReady(props: MCBlockProps, scene: BABYLON.Scene) {
    // setup the scene and camera
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    MCRender.setupCamera(scene);
    const engine = scene.getEngine();
    // engine.setHardwareScalingLevel(1 / window.devicePixelRatio);
    engine.setHardwareScalingLevel(0.1);

    // get the block model data
    const blockLocation = (props.custom ? "custom/" : "") + "block/" + props.name as ResourceLocationType;
    const modelData = await MCRender.getModelData(blockLocation);

    // render the block, only if it was actually gotten
    if (modelData) {
        await MCRender.Model.fromModelData(scene, modelData);
    }

    // disable the engine
    engine.stopRenderLoop();
    engine.dispose();
}

const MCBlock: FunctionComponent<MCBlockProps> = (props) => {
    return (
        <div className="MCBlock">
            <SceneComponent onSceneReady={scene => onSceneReady(props, scene)} antialias={false} />
        </div>
    );
};

// TODO: Figure out how to memoize this
export default React.memo(MCBlock, (prev, next) => { return (prev.name === next.name) && (prev.custom === next.custom); });
